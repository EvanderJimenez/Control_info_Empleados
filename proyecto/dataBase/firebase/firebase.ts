import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

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

const firestore = getFirestore(app);

export { firestore };
const storage = getStorage(app);

export async function upLoadImage(file) {
  const storageRef = ref(storage, "/imageEmployee/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function upLoadFile(file) {
  const storageRef = ref(storage, "/documentsEmployee/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
