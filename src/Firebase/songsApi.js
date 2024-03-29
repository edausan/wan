/* eslint-disable react-hooks/exhaustive-deps */
import { FirebaseApp, Firestore } from ".";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import moment from "moment";
import { getDownloadURL, getStorage, ref, uploadString, listAll } from "firebase/storage";

const lineupRef = collection(Firestore, "lineups");
const songsRef = collection(Firestore, "songs");

/**
 * TODO: ADD lineup
 */
export const AddLineup = async ({ lineup }) => {
  const filtered_songs = lineup.songs.filter((s) => s.title);

  try {
    // const filtered = filtered_songs.filter((s) => s.is_new);
    // filtered && (await AddNewSongs({ songs: filtered }));

    const saved_songs = filtered_songs.map((song) => {
      const id = song.title.split(" ").join("-").toLowerCase();
      return {
        id,
        title: song.title,
        label: song.label,
        tags: song.tags,
      };
    });

    if (saved_songs.length > 0) {
      const data = {
        ...lineup,
        songs: saved_songs,
        heart: [],
      };

      const saved = await addDoc(lineupRef, data);
      return saved;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddNewSongs = async ({ songs }) => {
  try {
    songs.forEach((song) => {
      const id = song.title.split(" ").join("-").toLowerCase();
      setDoc(doc(songsRef, id), {
        title: song.title,
        artist: song.artist,
        album: song.album,
        lyrics: song.lyrics,
        chords: song.chords,
        media: song.media || null,
        date_created: moment(new Date()).format("dddd LL"),
        tags: [...song.tags, song.label.split(" ")[0]],
        id,
      });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * TODO: Update pinned
 */
export const UpdateLineupPinned = async ({ lineup }) => {
  const id = lineup?.id;
  const ref = doc(lineupRef, id);

  try {
    const res = await updateDoc(ref, {
      ...lineup,
    });

    if (res === undefined) {
      return {
        updated: true,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * TODO: UPDATE lineup
 */
export const UpdateLineup = async ({ id, lineup }) => {
  const filtered_songs = lineup.songs.filter((s) => s.title);

  try {
    await AddNewSongs({ songs: filtered_songs.filter((s) => s.is_new) });

    const saved_songs = filtered_songs.map((song) => {
      const id = song.title.split(" ").join("-").toLowerCase();
      return {
        id,
        title: song.title,
        label: song.label,
        tags: song.tags,
      };
    });

    const ref = doc(lineupRef, id);
    const updated = await updateDoc(ref, {
      songs: saved_songs,
      ...lineup,
    });

    return updated;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * TODO: GET lineup per user
 */
export const GetLineup = async ({ id }) => {
  const q = query(lineupRef, where("worship_leader.uid", "==", id));

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
    throw new Error("No such document!");
  }
};

/**
 * TODO: Heart lineup
 */
export const HeartLineup = async ({ lineupId, userIds }) => {
  try {
    const ref = doc(lineupRef, lineupId);

    const res = await updateDoc(ref, {
      heart: userIds,
    });

    if (res === undefined) {
      return { updated: true };
    }
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

/**
 * TODO: UPDATE single song
 * @param song
 */
export const UpdateSong = async ({ song }) => {
  try {
    const id = song.song
      ? song.song.split(" ").join("-").toLowerCase()
      : song.title.split(" ").join("-").toLowerCase();
    const song_data = {
      title: song.song,
      artist: song.artist,
      album: song.album,
      lyrics: song.lyrics,
      chords: song.chords,
      media: song.media || null,
      date_created: moment(new Date()).format("dddd LL"),
      tags: [...song.tags, song.label?.split(" ")[0]],
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
    throw new Error(error.message);
  }
};

export const AddNewSong = async ({ song }) => {
  try {
    const id = song.title.split(" ").join("-").toLowerCase();
    const ref = doc(songsRef, id);
    const res = await setDoc(ref, { ...song, id });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateSongDetails = async ({ song }) => {
  try {
    const ref = doc(songsRef, song.id);
    const res = await updateDoc(ref, song);

    if (res === undefined) {
      return { updated: true };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateChords = async ({ id, chords }) => {
  try {
    const ref = doc(songsRef, id);

    if (id) {
      return await updateDoc(ref, { chords });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const UpdateLyrics = async ({ id, lyrics }) => {
  try {
    const ref = doc(songsRef, id);

    if (id) {
      return await updateDoc(ref, { lyrics });
    }
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * TODO: GET single song
 */
export const GetSong = async ({ song }) => {
  if (song?.id) {
    try {
      const ref = doc(songsRef, song.id);
      const lineup = await getDoc(ref);

      if (lineup.exists()) {
        return lineup.data();
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const GetAllSongs = async () => {
  const querySnapshot = await getDocs(songsRef);
  const songs = [];
  querySnapshot.forEach((doc) => {
    songs.push(doc.data());
  });

  return songs;
};

/**
 * TODO: REALTIME songs
 */
export const RealtimeSongs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, "songs"),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (docs.length > 0) {
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

export const GetAllLineups = async () => {
  const querySnapshot = await getDocs(lineupRef);
  const lineups = [];
  querySnapshot.forEach((doc) => {
    lineups.push({ ...doc.data(), id: doc.id });
  });
  return lineups;
};

/**
 * TODO: REALTIME lineups
 */
export const RealtimeLineups = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(lineupRef, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (docs.length > 0) {
          setData(docs);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return { data };
};

const storage = getStorage(FirebaseApp);

/**
 * TODO: Upload Album Cover Photo
 */
export const UploadAlbumCover = async ({ id, image }) => {
  /**
   * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
   */
  const imgRef = ref(storage, `album_cover/${id}`);

  /**
   * TODO: UPLOADING TO FIREBASE STORAGE
   */
  const uploaded = await uploadString(imgRef, image, "data_url");

  /**
   * TODO:  GET PHOTO DOWNLOAD URL
   */
  const photoURL = await getDownloadURL(uploaded.ref);

  return { photoURL };
};

const GetDownloadURL = async (ref) => {
  return await getDownloadURL(ref);
};

export const GetAlbumCovers = async () => {
  try {
    const listRef = ref(storage, "album_cover");
    const res = await listAll(listRef);

    const covers_data = res.items.map(async (itemRef) => {
      const photoURL = await GetDownloadURL(itemRef);
      if (typeof photoURL === "string") {
        const cover_data = { photoURL, fileName: itemRef.name };
        return cover_data;
      }
    });

    return covers_data.map(async (cover) => {
      return await cover;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetAllAlbumCovers = () => {
  const [covers, setCovers] = useState([]);

  const GetCovers = async () => {
    try {
      const listRef = ref(storage, "album_cover");
      const res = await listAll(listRef);

      const covers_data = res.items.map(async (itemRef) => {
        const photoURL = await GetDownloadURL(itemRef);

        if (typeof photoURL === "string") {
          const cover_data = { photoURL, fileName: itemRef.name };
          setCovers((prev) => [...prev, cover_data]);
          return cover_data;
        }
      });

      return covers_data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // useEffect(() => {
  // 	setCoversRef(albumQuery.data)
  // }, [albumQuery.data, albumQuery.isFetching])

  // useEffect(() => {
  // 	if (fileName && typeof photoURL === "string") {
  // 		const idx = covers.findIndex((c) => c.name === fileName);
  // 		if (idx === -1) {
  // 			setCovers([...covers, { name: fileName, photoURL }]);
  // 		}
  // 	}
  // }, [photoURL, fileName]);

  return { AlbumCovers: covers };
};
