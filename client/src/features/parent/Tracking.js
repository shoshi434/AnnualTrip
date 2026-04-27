import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {Map , MapCameraChangedEvent , AdvancedMarker} from '@vis.gl/react-google-maps';
import { useState , useEffect} from "react";
import { getLocations } from "../../api/location";

const Tracking = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState([]); 

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const studentName = decodedToken ? decodedToken.childName : null;

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocations();
                setLocation(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);



const PoiMarkers = ({ list }) => {
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
              boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
            }}>
              {poi.key}
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

    return (
        <div style={{backgroundColor: "#1a1a1a", height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>   
        <h1 style={{color:"white"}}>שלום להורה של {studentName}</h1>
        <button onClick={handleLogout} className="logout-btn">יציאה</button>
         <Map
            defaultZoom={13}
            defaultCenter={location[1]?.location}  
            mapId={process.env.REACT_APP_MAP_ID}          
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
                  <PoiMarkers list={location} />
        </Map>
        </div>
          
    );
}   

export default Tracking;