import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2eBu9B3GbY_wjmEPFd1EPZvcTU4VF3d8",
  authDomain: "web-novel-dd9d2.firebaseapp.com",
  projectId: "web-novel-dd9d2",
  storageBucket: "web-novel-dd9d2.firebasestorage.app",
  messagingSenderId: "539793220412",
  appId: "1:539793220412:web:deb688fba213c94a617439"
};

export const app = initializeApp(firebaseConfig);
export const database = getFireStore(app);
export const storage = getStorage(app);