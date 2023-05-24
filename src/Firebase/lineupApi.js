import { collection, getDocs, query, where } from "firebase/firestore";

import { FirebaseApp, Firestore } from ".";
const lineupRef = collection(Firestore, "lineups");

/**
 * TODO: GET all lineups
 */
export const GetAllLineups = async () => {
	const querySnapshot = await getDocs(lineupRef);
	const lineups = [];
	querySnapshot.forEach((doc) => {
		lineups.push({ ...doc.data(), id: doc.id });
	});
	return lineups;
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
