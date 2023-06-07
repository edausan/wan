import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { FirebaseApp, Firestore } from "../Firebase";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(FirebaseApp);
const usersRef = collection(Firestore, "user_metadata");

export const GetUserMetadata = async ({ id }) => {
  const docRef = doc(Firestore, "user_metadata", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    throw new Error("No user found!");
  }
};

export const UpdateUserMetadata = async ({ metadata }) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(Firestore, "user_metadata", user.uid);
    const updated = await updateDoc(userRef, {
      ...metadata,
    });

    return updated;
  } catch (error) {
    throw new Error(error);
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

    const user = auth.currentUser;
    const metadata = await GetUserMetadata({ id: user.uid });

    const metas = {
      life_verse,
      ministry,
      photoHeart: metadata.photoHeart || [],
      posts: metadata.posts || [],
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      assignments: metadata.assignments || [],
      notifications: metadata.notifications || [],
    };

    const update = await UpdateUserMetadata({
      metadata: metas,
    });

    return userCredential;
  } catch (error) {
    return error;
  }
};

export const GetAllUsers = async () => {
  const querySnapshot = await getDocs(usersRef);
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });

  return users;
};
