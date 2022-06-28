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
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

export const SetAssignments = async ({ assignments }) => {
  try {
    const ref = collection(Firestore, 'assignments');
    const created = await addDoc(ref, assignments);

    console.log({ created });
    return created;
  } catch (error) {
    console.log(error);
  }
};
