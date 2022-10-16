import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAMKyyxJQJtTyAND5JGx4wqt0dJ84K0Kjw",
  authDomain: "react-firebase-6ba00.firebaseapp.com",
  projectId: "react-firebase-6ba00",
  storageBucket: "react-firebase-6ba00.appspot.com",
  messagingSenderId: "70959395177",
  appId: "1:70959395177:web:46c986dd3e3897039ccdf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth } 