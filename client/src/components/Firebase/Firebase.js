
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDpBmIPGTbje7oqfpsxsrD_rvvmfSNdjc4",
  authDomain: "auth-9205a.firebaseapp.com",
  projectId: "auth-9205a",
  storageBucket: "auth-9205a.appspot.com",
  messagingSenderId: "1040771141006",
  appId: "1:1040771141006:web:133eb82d4546b2a03428df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName
        const email = result.user.email
        const profilePic = result.user.photoURL

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("profilePic", profilePic)
        
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
};

