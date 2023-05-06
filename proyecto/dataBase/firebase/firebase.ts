import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfHPA-Ao8hwWfn9O1wt1dmwJSkJg3oGCc",
  authDomain: "departamentosdb.firebaseapp.com",
  projectId: "departamentosdb",
  storageBucket: "departamentosdb.appspot.com",
  messagingSenderId: "725611960379",
  appId: "1:725611960379:web:4291e70de4866e0e29a41e",
  measurementId: "G-EMQVC3825X",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const firestore = getFirestore(app);
export { firestore,auth };

