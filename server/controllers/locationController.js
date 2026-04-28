const Location = require('../models/location');
const Student = require('../models/student');
const Teacher = require('../models/teacher');


// יצירה  מיקום חדש או עדכון אם כבר קיים עבור התלמיד
const createLocation = async (req, res) => {
    try {
        const { ID, Coordinates, Time } = req.body;
        if (!ID || !Coordinates || !Time) {
            return res.status(400).json({ message: "מיקום בפורמט שגוי" });
        }
        const thisStudent = await Student.findOne({ id: ID });
        const thisTeacher = await Teacher.findOne({ id: ID });
        if (!thisStudent && !thisTeacher) {
            return res.status(404).json({ message:"אות לא מוגדר"});
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
//פורמט מעובד
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

//קבלה לתלמידים ספציפיים 
//פורמט מעובד
// פורמט קלט: {ids: [123456789, 987654321]}
const getLocationById = async (req, res) => {
    try {
        const { ids } = req.body;
        const locations = await Location.find({ id: { $in: ids } });
        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: "מיקום לא נמצא" });
        }
        const editedList = locations.map(l => ({
            key: l.id,
            location: { lat: l.latitude, lng: l.longitude }
        }));
        res.json(editedList);
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