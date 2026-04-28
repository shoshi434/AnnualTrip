# ככה עושים היום טיול :)

---

## אודות

מערכת חכמה לניהול טיולים

> **שימו לב** — המערכת נבנתה בהנחות:
> - שהמורות והתלמידות שנרשמות עוברות סינכרון מול מערכות בית הספר כדי לוודא שהן אכן שייכות למוסד, וכדי למנוע רישום תלמידה בתור מורה ולהפך
> - ת"ז הוא פרט חסוי שלא ידוע לאנשים נוספים

---

## פיצ'רים במערכת

### זיהוי עם ת"ז
- הרשמה למורים חדשים
- כניסה כמורה רשום עם ת"ז
- כניסה עם ת"ז להורה שבנו רשום לטיול
- זיהוי חכם בעזרת טוקן למשך כל הסשן

### רישום תלמידות
- רישום לטיול הקרוב של כיתות ו'

### מערכת ניהול למורות
- צפיה בכל המורות הרשומות
- חיפוש מורה ספציפית לפי ת"ז
- צפיה בכל התלמידות הרשומות
- צפיה בתלמידות רק של הכיתה הספציפית
- **איתור תלמידות אבודות במהלך הטיול:**
  - איתור בעזרת אותות GPS שנשלחים ממכשירי האיכון שעל התלמידות
  - רשימת תלמידות שמרוחקות מהמורה יותר מ-3 ק"מ
  - הצגת המיקום שלהן במפה בייחס לשאר התלמידות / המורות

### מערכת מעקב בזמן אמת להורים
- הצגת מפה עם מיקום ילדם בזמן אמת בייחס לשאר ילדי הכיתה

---

## טכנולוגיות

| צד | טכנולוגיות |
|---|---|
| שרת | Express 5 • MongoDB • Mongoose 8 • JWT |
| לקוח | React 19 • Material-UI • React Router v7 • Google Maps API • Axios • jwt-decode |

---

## אבטחה

- אימות משתמשים באמצעות **JWT** — טוקן נוצר בכניסה ומועבר בכל בקשה ב-header
- כל נתיבי ה-API מוגנים ב-middleware שמוודא תקינות הטוקן
- הפרדה בין תפקידים: מורה / הורה — כל אחד רואה רק את המידע הרלוונטי לו

---

## התקנה והרצה

### דרישות מוקדמות
- Node.js 16+
- MongoDB
- Google Cloud account (לקבלת API Key ו-Map ID)

### התקנה

```bash
# שכפול הריפוזיטורי
git clone https://github.com/your-username/annual-trip.git
cd annual-trip

# התקנת תלויות שרת
cd server
npm install

# התקנת תלויות לקוח
cd ../client
npm install
```

### משתנים סביבתיים

צור קובץ `.env` בתיקיית `server`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/annual-trip
JWT_SECRET=your_jwt_secret
```

צור קובץ `.env` בתיקיית `client`:
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_MAP_ID=your_map_id
```

### הרצה

```bash
# הרצת השרת
cd server
npm start

# הרצת הלקוח (טרמינל נפרד)
cd client
npm start


```

---

## מקורות מידע

- **גוגל מפות עם ריאקט**
  - [react-google-maps — Get Started](https://visgl.github.io/react-google-maps/docs/get-started)
  - [Google Maps Platform 101 עם React](https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js?hl=he#1)

- **נוסחת Haversine**
  - [Using the Haversine Formula in JavaScript](https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript)

- **נתונים גיאו-מרחביים**
  - [MongoDB Geospatial Queries](https://www.mongodb.com/docs/manual/geospatial-queries/)

---
 🧡SHO



