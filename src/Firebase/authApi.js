import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { FirebaseApp, Firestore } from '../Firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

export const SetUserMetadata = async ({ id, life_verse, ministry }) => {
  const metadata = await setDoc(doc(Firestore, 'user_metadata', id), {
    life_verse,
    ministry,
  });

  console.log({ metadata });
};

export const GetUserMetadata = async ({ id }) => {
  // console.log({ id });
  const docRef = doc(Firestore, 'user_metadata', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
  return docSnap.data();
};

export const CreateAccount = async ({ email, password, ministry }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log({ user });

    const user_metadata = await SetUserMetadata({
      id: user.uid,
      ministry,
      life_verse: '',
    });
    console.log({ user_metadata });

    return { user_metadata, user };
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const SignIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log({ user });

    const metadata = await GetUserMetadata({ id: user.uid });
    const updatedMetadata = await UpdateUserMetadata({
      life_verse: metadata.life_verse,
      ministry: metadata.ministry,
    });

    console.log({ SignIn_metadata: metadata, updatedMetadata });

    return { user_metadata: metadata, user };
  } catch (error) {
    return error;
  }
};

export const SignOut = async () => {
  try {
    const userCredential = await signOut(auth);
    console.log({ userCredential });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProfile = async ({
  displayName,
  phoneNumber,
  photoURL,
  life_verse,
  ministry,
}) => {
  try {
    const userCredential = await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
      phoneNumber,
    });

    const update = await UpdateUserMetadata({
      life_verse,
      ministry,
    });

    console.log({ userCredential, update });

    return userCredential;
  } catch (error) {
    return error;
  }
};

export const RealtimeMetadata = () => {
  const user = auth.currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      try {
        onSnapshot(doc(Firestore, 'user_metadata', user.uid), (doc) => {
          console.log('Current data: ', doc.data());
          setData(doc.data());
        });
      } catch (error) {
        console.log({ RealtimeMetadata_ERROR: error });
      }
    }
  }, [user]);

  return { data };
};

const UpdatePhotoURL = async ({ photoURL }) => {
  try {
    const user = await updateProfile(auth.currentUser, {
      photoURL,
      displayName: auth.currentUser.displayName,
    });
    console.log({ user });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUserMetadata = async ({ life_verse, ministry }) => {
  console.log({ life_verse, ministry });
  try {
    const user = auth.currentUser;
    const userRef = doc(Firestore, 'user_metadata', user.uid);
    const updated = await updateDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      life_verse,
      ministry,
      posts: [],
    });

    console.log({ UpdateUserMetadata: updated });

    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const UploadPhoto = async ({ id, imageUpload }) => {
  const storage = getStorage(FirebaseApp);

  /**
   * TODO: REFERENCE TO FIRESTORE user_metadata COLLECTION WITH uid
   */
  const userRef = doc(Firestore, 'user_metadata', auth.currentUser.uid);

  /**
   * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
   */
  const imgRef = ref(storage, `profile/${imageUpload.name}`);

  /**
   * TODO: UPLOADING TO FIREBASE STORAGE
   */
  const uploaded = await uploadBytes(imgRef, imageUpload);

  /**
   * TODO:  GET PHOTO DOWNLOAD URL
   */
  const photoURL = await getDownloadURL(uploaded.ref);

  /**
   * TODO: UPDATE USER'S METADATA photoURL
   */
  const updated_user_metadata = await updateDoc(userRef, { photoURL });

  console.log({ updated_user_metadata });

  /**
   * TODO: UPDATE USER'S photoURL
   */
  const updateProfile = await UpdatePhotoURL({ photoURL });

  console.log({ updateProfile });
  return { photoURL, updateProfile };
};

export const GetUserProfile = async () => {};

export const GetWorshipLeaders = async () => {};
