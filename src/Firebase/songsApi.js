import { FirebaseApp, Firestore } from '.';
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
import moment from 'moment';

const auth = getAuth(FirebaseApp);

const lineupRef = collection(Firestore, 'lineups');
const songsRef = collection(Firestore, 'songs');

/**
 * TODO: ADD lineup
 */
export const AddLineup = async ({ lineup }) => {
  const filtered_songs = lineup.songs.filter((s) => s.title);

  try {
    await AddNewSongs({ songs: filtered_songs.filter((s) => s.is_new) });
    const saved_songs = filtered_songs.map((song) => {
      const id = song.title.split(' ').join('-').toLowerCase();
      return {
        id,
        title: song.title,
        label: song.label,
        tags: song.tags,
      };
    });

    if (saved_songs.length > 0) {
      const saved = await addDoc(lineupRef, {
        ...lineup,
        songs: saved_songs,
        heart: [],
      });
      return saved;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const AddNewSongs = async ({ songs }) => {
  try {
    songs.forEach((song) => {
      const id = song.title.split(' ').join('-').toLowerCase();
      setDoc(doc(songsRef, id), {
        title: song.title,
        artist: song.artist,
        album: song.album,
        lyrics: song.lyrics,
        chords: song.chords,
        media: song.media || null,
        date_created: moment(new Date()).format('dddd LL'),
        tags: [...song.tags, song.label.split(' ')[0]],
        id,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: UPDATE lineup
 */
export const UpdateLineup = async ({ id, lineup }) => {
  try {
    const ref = doc(lineupRef, id);
    const updated = await updateDoc(ref, {
      ...lineup,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: GET lineup per user
 */
export const GetLineup = async ({ id }) => {
  const q = query(lineupRef, where('user.uid', '==', id));

  const querySnapshot = await getDocs(q);
  const lineups = [];
  querySnapshot.forEach((doc) => {
    lineups.push({ ...doc.data(), id: doc.id });
    // doc.data() is never undefined for query doc snapshots
  });

  return lineups;
};

/**
 * TODO: GET single lineup
 */
export const GetSingleLineup = async ({ id }) => {
  const ref = doc(lineupRef, id);
  const lineup = await getDoc(ref);

  if (lineup.exists()) {
    return lineup.data();
  } else {
    console.log('No such document!');
  }
};

/**
 * TODO: Heart lineup
 */
export const HeartLineup = async ({ lineupId, userIds }) => {
  try {
    const ref = doc(lineupRef, lineupId);

    const updated = await updateDoc(ref, {
      heart: userIds,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: DELETE lineup
 */
export const DeleteLineup = async ({ id }) => {
  try {
    const ref = doc(lineupRef, id);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: UPDATE single song
 * @param song
 */
export const UpdateSong = async ({ song }) => {
  console.log({ UpdateSong: song });
  try {
    const id = song.song
      ? song.song.split(' ').join('-').toLowerCase()
      : song.title.split(' ').join('-').toLowerCase();
    const song_data = {
      title: song.song,
      artist: song.artist,
      album: song.album,
      lyrics: song.lyrics,
      chords: song.chords,
      media: song.media || null,
      date_created: moment(new Date()).format('dddd LL'),
      tags: [...song.tags, song.label?.split(' ')[0]],
      id,
    };

    const ref = doc(songsRef, id);

    if (song.id === id) {
      delete song.label;
      return await updateDoc(ref, song);
    } else {
      return await setDoc(ref, song_data);
    }

    // return updated;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: GET single song
 */
export const GetSong = async ({ song }) => {
  console.log({ song });

  if (song?.id) {
    try {
      const ref = doc(songsRef, song.id);
      const lineup = await getDoc(ref);

      if (lineup.exists()) {
        console.log({ GetSong_data: lineup.data() });
        return lineup.data();
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

/**
 * TODO: REALTIME songs
 */
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

/**
 * TODO: REALTIME lineups
 */
export const RealtimeLineups = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        lineupRef,

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
