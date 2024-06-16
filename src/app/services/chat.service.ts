import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IChatRoom } from '../models';

import { collection, doc, getDocs, query } from '@angular/fire/firestore';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  public getRooms(): Observable<Array<IChatRoom>> {
    chatRooms: Array<IChatRoom>;
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
    const q = query(collection(db, 'rooms'));
    const rooms: Array<IChatRoom> = [];
    onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        const id = doc.id;
        const data: IChatRoom = <IChatRoom>doc.data();
        rooms.push(<IChatRoom>{
          ...data,
          id,
        });
      });
    });
    return new BehaviorSubject(rooms).asObservable();
  }
}
