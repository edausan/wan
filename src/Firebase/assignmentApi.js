import { getAuth } from "firebase/auth";
import { FirebaseApp, Firestore } from "@/Firebase";
import { collection, doc, onSnapshot, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

const assignmentRef = collection(Firestore, "assignments");

export const SetAssignments = async ({ assignments }) => {
  try {
    const created = await addDoc(assignmentRef, { ...assignments });

    return created;
  } catch (error) {
    throw new Error(error);
  }
};

export const DeleteAssignment = async ({ id }) => {
  try {
    const ref = doc(assignmentRef, id);
    await deleteDoc(ref);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetAllAssignments = async () => {
  const querySnapshot = await getDocs(assignmentRef);
  const assignments = [];
  querySnapshot.forEach((doc) => {
    assignments.push(doc.data());
  });

  return assignments;
};

export const GetRealtimeAssignments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, "assignments"),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (docs.length > 0) {
            //   localStorage.setItem('orders', JSON.stringify(docs));
            //   const local_orders = JSON.parse(localStorage.getItem('orders'));
            setData(docs);
          }
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return { data };
};
