require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { startGpsSimulator } = require('./gpsSimulator');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  await startGpsSimulator();
}

main().catch(err => {
  process.exit(1);
});
