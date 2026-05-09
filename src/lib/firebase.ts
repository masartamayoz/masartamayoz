import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAF_ktwHXPw6gDkoolCI77XeB_NGHTmAFA",
  authDomain: "masartamayoz.firebaseapp.com",
  projectId: "masartamayoz",
  storageBucket: "masartamayoz.firebasestorage.app",
  messagingSenderId: "589955939618",
  appId: "1:589955939618:web:728ddeb7027b2becd1f97b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Critical connection test mandatory for AI Studio environment
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('✅ Firebase connection established');
  } catch (error) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('network-request-failed'))) {
      console.error("❌ Firebase connection failed. Check your network or configuration.");
    }
    console.error('Firebase Check:', error);
  }
}

testConnection();
