import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggenIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private userDetails$: Subject<User> = new Subject<User>();
  private userId: string = '';

  constructor(private auth: Auth, private router: Router) {
    if (typeof localStorage != 'undefined') {
      const savedUserString = localStorage.getItem('user');
      if (savedUserString != null) this.isLoggenIn$.next(true);
    }
    auth = getAuth();
    this.auth.useDeviceLanguage();
    auth.onAuthStateChanged((user) => {
      if (!!user) {
        this.userDetails$.next(user as User);
        const userString = JSON.stringify(user);
        if (typeof localStorage != 'undefined')
          localStorage.setItem('user', userString);
        this.isLoggenIn$.next(true);
        this.userId = user.uid;
      } else {
        if (typeof localStorage != 'undefined') localStorage.removeItem('user');
        this.isLoggenIn$.next(false);
      }
    });
  }

  public signInWithGoogle() {
    this.authLogin(new GoogleAuthProvider());
  }

  public signOut(): Promise<void> {
    return this.auth.signOut().then(() => {
      if (typeof localStorage != 'undefined') localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.userDetails$.next({
        uid: '',
        email: null,
        displayName: null,
        photoURL: null,
      });
    });
  }

  public isLoggenIn(): Observable<boolean> {
    return this.isLoggenIn$.asObservable();
  }

  public getUserData(): Observable<User> {
    return this.userDetails$.asObservable();
  }

  private authLogin(provider: GoogleAuthProvider) {
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        this.isLoggenIn$.next(true);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const token = credentials?.accessToken;
        const user = result.user;
        this.setUserData(user);
        this.router.navigate(['chat']);
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
    return setDoc(userRef, userData, { merge: true });
  }
}
