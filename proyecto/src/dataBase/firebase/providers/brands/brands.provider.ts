import { firestore } from "../../firebase";
import { Cycle, HoursEmployee } from "@/root/interface/brands";
import { Brands } from "@/root/interface/employee";
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

const getAllBrands = async () => {
  const brandsCollection = collection(firestore, "brands");
  const brandsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    brandsCollection
  );
  const brands: DocumentData[] = brandsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return brands;
};

async function createBrands(
  idEmployee: string,
  cycle: Cycle,
  hoursEmployee: HoursEmployee
): Promise<{ message: string; brands?: Brands } | undefined> { //TODO: Type all variables that you use
  const newDocRef = await addDoc(collection(firestore, "brands"), {
    idEmployee,
    cycle,
    hoursEmployee,
  });

  const newDoc = await getDoc(newDocRef);

  if (newDoc.exists()) {
    return {
      message: "Successfully created brands",
      brands: newDoc.data() as Brands,
    };
  }
}

const getDocId = async (docId: string) => {
  const brandsDocRef = doc(collection(firestore, "brands"), docId);
  const brandsDocSnapshot = await getDoc(brandsDocRef);

  if (brandsDocSnapshot.exists()) {
    return brandsDocSnapshot.data();
  }
  return brandsDocSnapshot.data();
};
const getDocByEmployeeId = async (idEmployee: string) => {
  const brandsCollection = collection(firestore, "brands");
  const queryBrands = query(
    brandsCollection,
    where("idEmployee", "==", idEmployee)
  );
  const brandsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    queryBrands
  );

  if (!brandsSnapshot.empty) {
    return brandsSnapshot.docs[0].data();
  }
};
//TODO:Check this, "Brand" is a name of the product or image, "in and out marks" are concepts related to this concept
const updateById = async (
  idEmployee: string,
  cycle: Cycle,
  hoursEmployee: HoursEmployee
) => {
  const brandsRef = collection(firestore, "brands");
  const q = query(brandsRef, where("idEmployee", "==", idEmployee));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    const brandsDoc = doc(firestore, "brands", querySnapshot.docs[0].id);
    await updateDoc(brandsDoc, {
      idEmployee,
      cycle,
      hoursEmployee,
    });
    const snapshotBrandsUpdate = await getDoc(brandsDoc);
    const brandsUpdate = snapshotBrandsUpdate.data();
    return brandsUpdate;
  }
};

export const brandsProvider = {
  getAllBrands,
  getDocId,
  createBrands,
  updateById,
  getDocByEmployeeId,
};

export default brandsProvider;
