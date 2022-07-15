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
  deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;
const postsRef = collection(Firestore, 'posts');

export const CreatePost = async ({ post }) => {
  try {
    const created = await addDoc(postsRef, post);

    return created;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: DELETE Post
 */
export const DeletePost = async ({ id }) => {
  try {
    const ref = doc(postsRef, id);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: Heart lineup
 */
export const ReactPost = async ({ postId, reactions }) => {
  try {
    const ref = doc(postsRef, postId);

    const updated = await updateDoc(ref, {
      reactions,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

export const UploadPostMedia = async ({ imageUpload }) => {
  const storage = getStorage(FirebaseApp);

  /**
   * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
   */
  const imgRef = ref(storage, `posts/${imageUpload.name}`);

  /**
   * TODO: UPLOADING TO FIREBASE STORAGE
   */
  const uploaded = await uploadBytes(imgRef, imageUpload);

  /**
   * TODO:  GET PHOTO DOWNLOAD URL
   */
  const photoURL = await getDownloadURL(uploaded.ref);
  return { photoURL };
};

/**
 * TODO: REALTIME Posts
 */
export const RealtimePosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(postsRef, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (docs.length > 0) {
          //   localStorage.setItem('orders', JSON.stringify(docs));
          //   const local_orders = JSON.parse(localStorage.getItem('orders'));
          setData(docs);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return { posts: data };
};
