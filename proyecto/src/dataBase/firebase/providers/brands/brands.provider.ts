import { firestore } from "../../firebase";
import { Brands, Cycle, Hours, HoursEmployee } from "@/root/interface/brands";
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
): Promise<{ message: string; brands?: any }> {
  const newDocRef = await addDoc(collection(firestore, "brands"), {
    idEmployee,
    cycle,
    hoursEmployee,
  });

  const newDoc = await getDoc(newDocRef);

  if (newDoc.exists()) {
    return {
      message: "Successfully created brands",
      brands: newDoc.data(),
    };
  } else {
    return {
      message: "Failed to create brands",
    };
  }
}

const getDocId = async (docId: string) => {
  const brandsDocRef = doc(collection(firestore, "brands"), docId);
  const brandsDocSnapshot = await getDoc(brandsDocRef);

  if (brandsDocSnapshot.exists()) {
    return brandsDocSnapshot.data();
  } else {
    throw new Error(`A brands with document ID was not found: ${docId}`);
  }
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

  if (brandsSnapshot.empty) {
    throw new Error(`No brands document found for idEmpleado: ${idEmployee}`);
  } else {
    return brandsSnapshot.docs[0].data();
  }
};

const updateById = async (
  idEmployee: string,
  cycle: Hours,
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
