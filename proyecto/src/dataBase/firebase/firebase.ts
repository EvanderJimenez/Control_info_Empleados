import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);
export { firestore, auth };

const storage = getStorage(app);

export async function upLoadImage(file: any) {
  const storageRef = ref(storage, "/imageEmployee/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function upLoadFile(file: any) {
  const storageRef = ref(storage, "/documentsEmployee/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

const deleteFile = async (filePath: any) => {
  try {
    const fileRef = ref(storage, filePath);

    await deleteObject(fileRef);

    console.log("Archivo eliminado correctamente");
  } catch (error) {
    console.log("Error al eliminar el archivo:", error);
  }
};
