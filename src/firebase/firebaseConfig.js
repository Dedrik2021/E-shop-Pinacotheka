import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig  = {
	apiKey: process.env.react_APP_API_KEY,
	authDomain: process.env.react_APP_AUTH_DOMAIN,
	databaseURL: process.env.react_APP_DATABASE_URL,
	projectId: process.env.react_APP_PROJECT_ID,
	storageBucket: process.env.react_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.react_APP_SENDER_ID,
	appId: process.env.react_APP_APP_ID,
	measurementId: process.env.react_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const analyticsNews = getAnalytics(app);
export const database = getFirestore(app);
export const realDb = getDatabase(app);
export const storage = getStorage(app);