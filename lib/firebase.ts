// App.tsx
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"; // Optional: Firestore
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
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
    createUserDocument(user);
    // crashlytics().log(`user ${email} created successfully`);
    return user;
  } catch (error) {
    console.log("error", error);

    throw error;
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

const updateUsername = async (uid: string, newUsername: string) => {
  // Reference to the users collection
  const usersRef = collection(db, "users");

  try {
    // Check if the username already exists
    const usernameQuery = query(
      usersRef,
      where("username", "==", newUsername.toLowerCase())
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
      // If querySnapshot is not empty, username already exists

      throw new Error(
        "Username already exists, please choose a different one."
      );
    }

    // If username doesn't exist, update the current user's document
    const userDocRef = doc(db, `users/${uid}`);
    await updateDoc(userDocRef, {
      username: newUsername.toLowerCase(),
    });

    return true;
  } catch (error) {
    throw new Error("Error checking/updating username");
  }
};

const createUserDocument = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const userData = {
    name: user.displayName || null,
    email: user.email,
    profileImage: user.photoURL || null,
    lastActive: Timestamp.now(),
    chats: [],
    status: "offline",
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {}
};

// Function to monitor auth state and trigger user document creation
const monitorAuthState = () => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      await createUserDocument(user);
    } else {
      console.log("No user signed in");
    }
  });

  return unsubscribe;
};

export { login, register, logout, monitorAuthState, updateUsername };
