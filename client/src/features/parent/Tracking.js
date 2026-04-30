import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {Map , AdvancedMarker} from '@vis.gl/react-google-maps';
import { useState , useEffect} from "react";
import { getLocations } from "../../api/location";


const PoiMarkers = ({ list, studentId }) => {
  return (
    <>
      {list.map( (poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <div style={poi.key === studentId ? {
              backgroundColor: '#ffd700',
              padding: '3px 10px',
              borderRadius: '12px',
              border: '2px solid #ff8c00',
              fontSize: '13px',
              fontWeight: 'bold',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              boxShadow: '0px 0px 8px rgba(255,140,0,0.7)',
              color: '#333',
            } : {
              backgroundColor: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
            }}>
              {poi.key === studentId ? "הילד שלך" : `${poi.key}`}
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



const Tracking = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]); 
    const [center, setCenter] = useState(null);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const studentName = decodedToken ? decodedToken.childName : null;
    const studentId = decodedToken ? decodedToken.childId : null;

    //כפתור יציאה
    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('token');
    };
    //טעינת המיקומים ועדכון מרכז המפה לפי מקומי הילדים
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocations();
                setLocations(response.data);
                const childLocation = response.data.find(loc => loc.key === studentId);
                if (childLocation) {
                      setCenter(childLocation.location);
                  }else {
                      setCenter({ lat: response.data[0].location.lat, lng: response.data[0].location.lng });
                  }
                }
            catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
        // עדכון המיקומים כל דקה
        const interval = setInterval(fetchLocations, 60 * 1000); // polling כל דקה
        return () => clearInterval(interval);
    }, [studentId]);

    return (
        <div style={{backgroundColor: "#1a1a1a", height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> 
          <div style={{display: "flex", alignItems: "center", width: "90vw" , justifyContent: "space-between"}}>
            <button onClick={handleLogout} className="logout-btn">יציאה</button>
            <h3 style={{color:"white", fontFamily: "Arial" , textAlign: "right"}}>שלום להורה של {studentName}, כאן ניתן לעקוב אחר מיקומה של ילדתך בזמן אמת <br/> שימו לב למיקום בייחס לשאר התלמידים הממוקמים על המפה, הילדה שלך מסומנת בתגית - הילד שלך <br/>במקרה של חשש לשלום ילדכם אנא דווחו בהקדם לצוות הטיול</h3>
          </div>
          {center ? (
                      <Map
                        defaultZoom={16}
                        defaultCenter={center}
                        mapId={process.env.REACT_APP_MAP_ID}          
                        onCameraChanged={ (ev) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }>
                          <PoiMarkers list={locations} studentId={studentId} />
                      </Map>
                    ):(
                      <p style={{color:"white"}}>טוען מיקום...</p>
                    )
          }
        </div>     
    );
}   

export default Tracking;