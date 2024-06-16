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

  /*   public getRooms(): Observable<Array<IChatRoom>> {
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
      console.log(rooms);
    });
    return new BehaviorSubject(rooms).asObservable();
  } */

  public getRooms(): Observable<Array<IChatRoom>> {
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
      docs.docChanges().forEach((change) => {
        const id = change.doc.id;
        const data: IChatRoom = <IChatRoom>change.doc.data();
        const currRoom = <IChatRoom>{
          ...data,
          id,
        };
        console.log(currRoom);
        switch (change.type) {
          case 'added':
            rooms.push(currRoom);
            console.log('room added at index ', rooms.indexOf(currRoom));
            break;
          case 'modified':
            rooms[rooms.findIndex((elem) => elem.id == currRoom.id)] = currRoom;
            console.log('room modified at index ', rooms.indexOf(currRoom));
            break;
          case 'removed':
            const index: number = rooms.findIndex(
              (elem) => elem.id == currRoom.id
            );
            rooms.splice(index, 1);
            console.log('room deleted at index ', index);
            break;
        }
        console.log(rooms);
      });
    });
    return new BehaviorSubject(rooms).asObservable();
  }
}
