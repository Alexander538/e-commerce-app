import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0xYCLPwWpCmW7eEWEX0biVi2PgfrZs48',
  authDomain: 'coolcatshats-6fa0c.firebaseapp.com',
  projectId: 'coolcatshats-6fa0c',
  storageBucket: 'coolcatshats-6fa0c.appspot.com',
  messagingSenderId: '548527838530',
  appId: '1:548527838530:web:4414b4ef8635c1830324db',
  measurementId: 'G-FZGE39NSSZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
