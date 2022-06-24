import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { FirebaseApp, Firestore } from './../Firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const metadata = collection(Firestore, 'user_metadata');

const auth = getAuth(FirebaseApp);

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

    console.log({ SignIn_metadata: metadata });

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

    const update = await SetUserMetadata({
      id: auth.currentUser.uid,
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
