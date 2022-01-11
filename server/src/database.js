import { initializeApp, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
const serviceAccount = require("../key-adminsdk.json");
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://chat-family-e0c1e.firebaseio.com"
});

export default getDatabase()

