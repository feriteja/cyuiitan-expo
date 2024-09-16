// App.tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Optional: Firestore
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import crashlytics from "@react-native-firebase/crashlytics";

const firebaseConfig: any = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_API_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app.name); // Should print '[DEFAULT]'

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app); // Optional: Initialize Firestore

const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.log({ error });

    throw error;
  }
};

const register = async (
  email: string,
  password: string,
  confPassword: string
) => {
  try {
    if (password != confPassword) throw new Error("password doesn't match");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // crashlytics().log(`user ${email} created successfully`);
    return user;
  } catch (error) {
    console.log("error", error);

    throw error;
  }
};

export { login, register };
