const { distanceCeController } = require("../utils/distanceCalculator");

const distanceController = async (req, res) => {
    try {
        const { lat1, lon1, lat2, lon2 } = req.body;
        if (!lat1 || !lon1 || !lat2 || !lon2) {
            return res.status(400).json({ message: "נתונים בפורמט שגוי" });
        }
        const distance = distanceCeController(lat1, lon1, lat2, lon2);
        res.json({ distance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

module.exports = {
    distanceController
};
