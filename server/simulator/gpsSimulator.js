

const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Location = require('../models/location');


const ROUTE_WAYPOINTS = [
  { lat: 31.7683,  lng: 35.2137 }, // העיר העתיקה – נקודת מוצא
  { lat: 31.7767,  lng: 35.2345 }, // הר הצופים
  { lat: 31.7612,  lng: 35.1956 }, // יד ושם
  { lat: 31.7754,  lng: 35.1936 }, // גן סאקר
  { lat: 31.7857,  lng: 35.2040 }, // מחנה יהודה
  { lat: 31.7690,  lng: 35.2163 }, // מגדל דוד – נקודת יעד
];

// כמה צעדים בין כל זוג נקודות ציון
const STEPS_PER_SEGMENT = 10;

// בניית מערך מפורט של נקודות לאורך המסלול
function buildRoutePoints() {
  const points = [];
  for (let i = 0; i < ROUTE_WAYPOINTS.length - 1; i++) {
    const from = ROUTE_WAYPOINTS[i];
    const to   = ROUTE_WAYPOINTS[i + 1];
    for (let s = 0; s < STEPS_PER_SEGMENT; s++) {
      const t = s / STEPS_PER_SEGMENT;
      points.push({
        lat: from.lat + (to.lat - from.lat) * t,
        lng: from.lng + (to.lng - from.lng) * t,
      });
    }
  }
  points.push(ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1]);
  return points;
}

const ROUTE_POINTS = buildRoutePoints();


function getJitteredPoint(basePoint, jitterMeters = 50) {
  const jitterDeg = jitterMeters / 111320; 
  return {
    lat: basePoint.lat + (Math.random() - 0.5) * 2 * jitterDeg,
    lng: basePoint.lng + (Math.random() - 0.5) * 2 * jitterDeg,
  };
}


const LOST_CHANCE   = 0.15; // 15% סיכוי בכל דקה
const LOST_DURATION = 3;    // נשאר אבוד 3 דקות
const LOST_DRIFT_M  = 800;  // נסחף 800 מטר מהמסלול

function getLostPoint(basePoint) {
  const driftDeg = LOST_DRIFT_M / 111320;
  const angle = Math.random() * 2 * Math.PI;
  return {
    lat: basePoint.lat + Math.sin(angle) * driftDeg,
    lng: basePoint.lng + Math.cos(angle) * driftDeg,
  };
}


async function saveLocation(id, lat, lng) {
  const existing = await Location.findOne({ id });
  if (existing) {
    existing.latitude  = lat;
    existing.longitude = lng;
    existing.time      = new Date();
    await existing.save();
  } else {
    await Location.create({ id, latitude: lat, longitude: lng, time: new Date() });
  }
}


async function startGpsSimulator() {
  // שליפת כל המורים והתלמידים ישירות ממסד הנתונים
  const [teachers, students] = await Promise.all([
    Teacher.find(),
    Student.find(),
  ]);

  const allParticipants = [
    ...teachers.map(t => ({ id: t.id, name: t.fullName, role: 'מורה' })),
    ...students.map(s => ({ id: s.id, name: s.fullName, role: 'תלמיד' })),
  ];

  if (allParticipants.length === 0) {
    console.warn('[GPS Simulator] אין משתתפים – הסימולטור עצר.');
    return;
  }

  // כל משתתף מתחיל בנקודה קצת שונה כדי לדמות פיזור בקבוצה
  const participantState = allParticipants.map((p, index) => ({
    ...p,
    stepIndex: Math.floor((index / allParticipants.length) * 3),
    lostTicksLeft: 0,   // כמה דקות נשאר במצב אבוד
    lostPoint: null,    // נקודת ההתרחקות
  }));

  async function tick() {
    const tickTime = new Date().toLocaleTimeString('he-IL');
    await Promise.all(participantState.map(async (p) => {
      const basePoint = ROUTE_POINTS[p.stepIndex];
      let point;

      if (p.lostTicksLeft > 0) {
        // --- מצב אבוד: נשאר בנקודת ההתרחקות עם ג'יטר קטן ---
        point = getJitteredPoint(p.lostPoint, 30);
        p.lostTicksLeft--;
        if (p.lostTicksLeft === 0) {
          p.lostPoint = null;
        }
      } else {
        // בדיקה האם תלמיד נאבד בדקה הזו
        if (p.role === 'תלמיד' && Math.random() < LOST_CHANCE) {
          p.lostPoint     = getLostPoint(basePoint);
          p.lostTicksLeft = LOST_DURATION;
          point = getJitteredPoint(p.lostPoint, 30);
        } else {
          point = getJitteredPoint(basePoint);
        }

        if (p.stepIndex < ROUTE_POINTS.length - 1) {
          p.stepIndex++;
        } else {
          p.stepIndex = 0;
        }
      }

      await saveLocation(p.id, point.lat, point.lng);
    }));


  }

  await tick();
  setInterval(tick, 60 * 1000);
}

module.exports = { startGpsSimulator };