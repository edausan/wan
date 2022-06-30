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
    const saved = await addDoc(collection(Firestore, 'lineups'), {
      ...lineup,
      heart: [],
    });
    return saved;
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateLineup = async ({ id, lineup }) => {
  try {
    const ref = doc(Firestore, 'lineups', id);
    const updated = await updateDoc(ref, {
      ...lineup,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
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
    lineups.push({ ...doc.data(), id: doc.id });
    // doc.data() is never undefined for query doc snapshots
  });

  return lineups;
};

export const GetSingleLineup = async ({ id }) => {
  const ref = doc(Firestore, 'lineups', id);
  // const q = query(collection(Firestore, "lineups", id), where("id", "==", id))

  const lineup = await getDoc(ref);

  if (lineup.exists()) {
    return lineup.data();
  } else {
    console.log('No such document!');
  }
};

export const HeartLineup = async ({ lineupId, userIds }) => {
  console.log({ lineupId, userIds });
  try {
    const ref = doc(Firestore, 'lineups', lineupId);

    const updated = await updateDoc(ref, {
      heart: userIds,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteLineup = async ({ id }) => {
  try {
    const ref = doc(Firestore, 'lineups', id);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error.message);
  }
};

export const AddSongs = ({ songs }) => {
  console.log({ songs });
  songs.forEach(async (song) => {
    try {
      await addDoc(collection(Firestore, 'songs'), {
        ...song,
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const UpdateSong = async ({ id, song }) => {
  try {
    const ref = doc(Firestore, 'songs', id);
    const updated_song = await updateDoc(ref, {
      ...song,
    });

    console.log({ updated_song });
  } catch (error) {
    console.log(error.message);
  }
};

export const RealtimeSongs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, 'songs'),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (docs.length > 0) {
            console.log({ docs });
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

export const RealtimeLineups = () => {
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
