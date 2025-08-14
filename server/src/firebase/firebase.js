const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_ACCOUNT_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ACCOUNT_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
