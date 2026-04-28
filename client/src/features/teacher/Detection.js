import {calculateDistance} from "../../api/distance";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {getStudentsByClassName} from "../../api/studentApi";
import {getLocationById} from "../../api/location";
import {Map , AdvancedMarker} from '@vis.gl/react-google-maps';

const PoiMarkers = ({ list , teacherId }) => {
  return (
    <>
      {list.map( (poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <div style={{
              backgroundColor: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
              color: 'black'
            }}>
              {poi.key === teacherId ? "אתה" : `${poi.key}`}
            </div>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#ff0000',
              border: '2px solid #000',
              borderRadius: '60% 60% 50% 0',
              transform: 'rotate(-45deg)',
            }} />
          </div>        
        </AdvancedMarker>
      ))}
    </>
  );
};

const Detection = () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const teacherId = decodedToken ? decodedToken.id : null;
    const teacherClassName = decodedToken ? decodedToken.className : null;
    const [students, setStudents] = useState([]);
    const [locations , setLocations] = useState([]);
    const [teacherLocation , setTeacherLocation] = useState(null);
    const [distances , setDistances] = useState({});
    const [center , setCenter] = useState(null);
    const [all , setAll] = useState([]);

    //סינון תלמידות רק שח המורה הזאת
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudentsByClassName(teacherClassName);
                setStudents(data.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, [teacherClassName]);

    //שליפת מיקומים רק לתלמידות הנ"ל
        useEffect(() => {
        if (!students.length) return;
        const fetchLocations = async () => {
            try {
                const ids = students.map(student => student.id);
                const data = await getLocationById(ids);
                console.log("Locations received from server:", data.data);
                setLocations(data.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchLocations();
    }, [students]);

    //שליפת מיקום המורה
    useEffect(() => {
        const fetchTeacherLocation = async () => {
            try {
                const data = await getLocationById([teacherId]);
                setTeacherLocation(data.data[0])
                setCenter({ lat: data.data[0].location.lat, lng: data.data[0].location.lng });
            } catch (error) {
                console.error("שגיאה בשליפת מיקום המורה:", error);
            }
        };
        fetchTeacherLocation();
    }, [teacherId]);

    //חישוב מרחק בין המורה לתלמידות
    //החזרת מילון של ת"ז ומרחק מהמורה
    useEffect(() => {
        if (!teacherLocation || !locations.length) 
            return;
        const fetchDistances = async () => {
            const results = {};
            for (const loc of locations) {
                try {
                    const result = await calculateDistance(
                        loc.location.lat, loc.location.lng,
                        teacherLocation.location.lat, teacherLocation.location.lng
                    );
                    results[loc.key] = result.distance;
                } catch (error) {
                    console.error("Error calculating distance for", loc.id, error);
                }
            }
            setDistances(results);
        };
        fetchDistances();
    }, [locations, teacherLocation]);

    //כל המיקומים 
    useEffect(() => {
        if (!locations.length) return;
        const allLocations = [...locations];
        if (teacherLocation) {
            allLocations.push(teacherLocation);
        }
        setAll(allLocations);
    }, [locations, teacherLocation]);

    //הצגה על המפה של המורה והתלמידות על מורה כתוב אני
    return (
        <div style={{display: "flex", color: "white", textAlign: "right" ,height: "70vh", width: "90vw" , justifyContent: "space-between", fontFamily: "arial"}}>
            <div>
                <h1>תלמידים מרוחקים מהמורה מעל 3 ק"מ</h1>
                {students.filter(student => distances[student.id] >=3).length === 0 ? <p>אין תלמידים מרוחקים</p>
                    : students.filter(student => distances[student.id] >=3).map(student => (
                    <div key={student.id}>
                        <p>{student.fullName} - {student.id} - מרחק מהמורה: {distances[student.id] ? `${distances[student.id].toFixed(2)} ק"מ` : "טוען..."}</p>
                    </div>
                ))}
            </div>
            {center && teacherLocation ? (
                <div style={{ height: "60vh", width: "45vw"}}>
                    <h1 style={{fontFamily: "arial"}}>מיקומים על המפה</h1>
                    <Map
                    defaultZoom={13}
                    defaultCenter={center}
                    mapId={process.env.REACT_APP_MAP_ID}>
                    <PoiMarkers list={all} teacherId={teacherId} />
                    </Map>
                </div>
                    ):(
                        <p style={{color:"white"}}>טוען מיקום...</p>
                    )
            }
        </div>
    );
}
export default Detection;