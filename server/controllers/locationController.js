const Location = require('../models/location');
const Student = require('../models/student');


// יצירה  מיקום חדש או עדכון אם כבר קיים עבור התלמיד
const createLocation = async (req, res) => {
    try {
        const { ID, Coordinates, Time } = req.body;
        if (!ID || !Coordinates || !Time) {
            return res.status(400).json({ message: "מיקום בפורמט שגוי" });
        }
        const thisStudent = await Student.findOne({ id: ID });
        if (!thisStudent) {
            return res.status(404).json({ message:"אי אפשר לשמור מיקום לילד לא רשום. אות פסול"});
         }
        const existing = await Location.findOne({ id: ID });
        if (existing) {
            existing.longitude = Number(Coordinates.Longitude.Degrees) + Number(Coordinates.Longitude.Minutes)/60 + Number(Coordinates.Longitude.Seconds)/3600;
            existing.latitude = Number(Coordinates.Latitude.Degrees) + Number(Coordinates.Latitude.Minutes)/60 + Number(Coordinates.Latitude.Seconds)/3600;
            existing.time = new Date(Time);
            await existing.save();
            return res.json(existing);
        }
        const longitude =Number(Coordinates.Longitude.Degrees) + Number(Coordinates.Longitude.Minutes)/60 + Number(Coordinates.Longitude.Seconds)/3600;
        const latitude = Number(Coordinates.Latitude.Degrees) + Number(Coordinates.Latitude.Minutes)/60 + Number(Coordinates.Latitude.Seconds)/3600;
        const id = ID.toString();
        const time = new Date(Time);
        const location = new Location({ id, longitude, latitude , time });
        await location.save();
        res.status(201).json(location)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//קבלת כל המיקומים
//{key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }}
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        const editedList = locations.map(l => ({
            key: l.id,
            location: { lat: l.latitude, lng: l.longitude }
        }));
        res.json(editedList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//קבלה לתלמידה ספציפית 
const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findOne({ id });
        if (!location) {
            return res.status(404).json({ message: "מיקום לא נמצא" });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createLocation,
    getAllLocations,
    getLocationById
}

/*
--- דוגמה לנתוני מיקום שנשלחים מהGPS
{
"ID":123456789,
"Coordinates":{
"Longitude": {"Degrees": "34", "Minutes": "46", "Seconds": "44"},
"Latitude": {"Degrees": "32", "Minutes": "5", "Seconds": "23"}
},
"Time": "2024 12 05T15:30:00Z"
}

*/