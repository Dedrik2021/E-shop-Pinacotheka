import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig  = {
	apiKey: 'AIzaSyDdQxVIBYDWcJ5la1nJjhTMMqADyuSOsmk',
	authDomain: 'pinakotheka-12056.firebaseapp.com',
	databaseURL: 'https://pinakotheka-12056-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'pinakotheka-12056',
	storageBucket: 'pinakotheka-12056.appspot.com',
	messagingSenderId: '360982582119',
	appId: '1:360982582119:web:faa001120e772ef8c095c2',
	measurementId: 'G-60T7YVJ275',
};

export const app = initializeApp(firebaseConfig);
const analyticsNews = getAnalytics(app);
export const database = getFirestore(app);
export const realDb = getDatabase(app);
export const storage = getStorage(app);