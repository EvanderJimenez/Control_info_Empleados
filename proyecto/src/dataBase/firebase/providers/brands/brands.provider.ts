import { Brands, Schedule } from "@/root/interface/employee";
import { firestore, auth } from "../../firebase";
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const getAll = async () => {
    const brandsCollection = collection(firestore, "brands");
    const brandsSnapshot: QuerySnapshot<DocumentData> = await getDocs(brandsCollection);
    const brands: DocumentData[] = brandsSnapshot.docs.map((doc) => doc.data());

    return brands;
  };

  export const brandsProvider = {
    getAll,

  };
  
  export default brandsProvider;