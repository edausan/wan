import { getAuth } from 'firebase/auth';
import { FirebaseApp, Firestore } from '../Firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

export const SetAssignments = async ({ assignments }) => {
  try {
    const ref = collection(Firestore, 'assignments');
    const created = await addDoc(ref, { ...assignments });

    return created;
  } catch (error) {
    console.log(error);
  }
};

export const GetRealtimeAssignments = () => {
  const user = auth.currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, 'assignments'),

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
        }
      );
    } catch (error) {
      console.log({ RealtimeMetadata_ERROR: error });
    }
  }, []);

  return { data };
};
