import * as firebase from 'firebase';
import Constants from 'expo-constants';

const firebaseConfig = process.env.EXPO_FIREBASE_CONFIG || Constants.manifest.extra.firebaseConfig;

export default firebase.initializeApp(firebaseConfig);