import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {
    auth = getAuth();

    this.auth.useDeviceLanguage();
  }

  public signInWithGoogle() {
    this.authLogin(new GoogleAuthProvider());
  }

  private authLogin(provider: GoogleAuthProvider) {
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const token = credentials?.accessToken;
        const user = result.user;
        this.setUserData(user);
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  }

  private setUserData(user?: User): Promise<void> | void {
    if (!user) return;
    const firebaseConfig = {
      apiKey: 'AIzaSyBlNGA1P6GKnma1Bj-JExrtrko8WpF8RFQ',
      authDomain: 'ng-chat-75827.firebaseapp.com',
      projectId: 'ng-chat-75827',
      storageBucket: 'ng-chat-75827.appspot.com',
      messagingSenderId: '732035539523',
      appId: '1:732035539523:web:4db7a494dbcf5caa35eaf6',
      measurementId: 'G-HHZYVQYLGE',
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const userRef = doc(db, 'users', user.uid);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    setDoc(userRef, userData, { merge: true });
  }
}
