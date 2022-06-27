import { FirebaseApp, Firestore } from '../Firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth(FirebaseApp);

export const AddLineup = async ({ lineup }) => {
  try {
    const id = serverTimestamp();
    console.log({ lineup, id });
    const saved = await addDoc(collection(Firestore, 'lineups'), {
      ...lineup,
    });

    console.log({ saved_id: saved.id });
    return saved;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateLineup = async ({ id, lineup }) => {
  console.log({ id, lineup });
  try {
    const ref = doc(Firestore, 'lineups', id);
    const updated = await updateDoc(ref, {
      ...lineup,
    });

    console.log({ updated });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const GetLineup = async ({ id }) => {
  const q = query(
    collection(Firestore, 'lineups'),
    where('user.uid', '==', id)
  );

  const querySnapshot = await getDocs(q);
  const lineups = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    lineups.push(doc.data());
    // doc.data() is never undefined for query doc snapshots
  });

  console.log({ lineups });

  return lineups;
};

export const HeartLineup = async ({ lineupId, userIds }) => {
  try {
    const ref = doc(Firestore, 'lineups', lineupId);

    const updated = await updateDoc(ref, {
      heart: userIds,
    });

    console.log({ updated });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteLineup = async ({ id }) => {
  try {
    const ref = doc(Firestore, 'lineups', id);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const RealtimeLineups = () => {
  const user = auth.currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, 'lineups'),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log({ docs });

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
