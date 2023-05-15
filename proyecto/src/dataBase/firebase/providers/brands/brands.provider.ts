import { firestore } from "@/dataBase/firebase";
import { Brands, Hours } from "@/root/interface/brands";
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
  cycle: Date
): Promise<{ message: string; brands?: any }> {
  try {
    const newDocRef = await addDoc(collection(firestore, "brands"), {
      idEmployee,
      cycle,
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
  } catch (error) {
    return {
      message: `An error occurred while creating the brands: ${error}`,
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
  const brandsCollectionRef = collection(firestore, "brands");
  const queryRef = query(
    brandsCollectionRef,
    where("idEmployee", "==", idEmployee)
  );
  const querySnapshot = await getDocs(queryRef);

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    return docSnapshot.data();
  } else {
    throw new Error(`A brands with idEmployee '${idEmployee}' was not found`);
  }
};

const updateById = async (idEmployee: string, cycle: Hours) => {
  try {
    const brandsRef = collection(firestore, "brands");
    const q = query(brandsRef, where("idEmployee", "==", idEmployee));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const brandsDoc = doc(firestore, "brands", querySnapshot.docs[0].id);
      await updateDoc(brandsDoc, {
        idEmployee,
        cycle,
      });
      const snapshotbrandsUpdate = await getDoc(brandsDoc);
      const brandsUpdate = snapshotbrandsUpdate.data();
      return brandsUpdate;
    }
  } catch (error) {
    console.error("Error updating brands:", error);
    throw new Error("Failed to update brands");
  }
};

export const departmentProvider = {
  getAllBrands,
  getDocId,
  createBrands,
  updateById,
  getDocByEmployeeId,
};

export default departmentProvider;
