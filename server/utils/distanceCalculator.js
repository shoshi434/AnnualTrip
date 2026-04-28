// חישוב לפי נוסחת Haversine 

const distanceCeController =(lat1, lon1, lat2, lon2) => {
  const radians = (deg) => deg * (Math.PI / 180);
    var R = 6371; // km 
    var dLat = radians(lat2-lat1);  
    var dLon = radians(lon2-lon1);  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

    return d;
};

module.exports = {
  distanceCeController,
};