import { getDocs, collection, query, orderBy } from "firebase/firestore/lite";

import { database } from "../../../firebase/firebaseConfig";


export const fetchData = async (base) => {
    const collectionRef = collection(database, base)

	const collectionQuery = query(collectionRef, orderBy('id', 'asc'));
	const data = await getDocs(collectionQuery);
	const returnData = await data.docs.map((item) => {
		return {...item.data(), ID: item.id};
	});
	return returnData
}