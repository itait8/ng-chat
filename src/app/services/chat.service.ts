import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, merge } from 'rxjs';
import { IChatRoom, IMessage } from '../models';

import { collection, doc, getDocs, query } from '@angular/fire/firestore';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { addDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private db;
  constructor() {
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
    this.db = getFirestore(app);
  }

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
    const roomsQuery = query(collection(this.db, 'rooms'));
    const rooms: Array<IChatRoom> = [];
    onSnapshot(roomsQuery, (docs) => {
      docs.docChanges().forEach((change) => {
        const id = change.doc.id;
        const data: IChatRoom = <IChatRoom>change.doc.data();
        const currRoom = <IChatRoom>{ ...data, id };
        switch (change.type) {
          case 'added':
            rooms.push(currRoom);
            break;
          case 'modified':
            rooms[rooms.findIndex((elem) => elem.id == currRoom.id)] = currRoom;
            break;
          case 'removed':
            const index: number = rooms.findIndex(
              (elem) => elem.id == currRoom.id
            );
            rooms.splice(index, 1);
            break;
        }
      });
    });
    return new BehaviorSubject(rooms).asObservable();
  }

  public getRoomMessages(roomId: string): Observable<Array<IMessage>> {
    const roomMessagesQuery = query(
      collection(this.db, 'rooms', roomId, 'messages')
    );
    const messages: Array<IMessage> = [];
    onSnapshot(roomMessagesQuery, (docs) => {
      docs.docChanges().forEach((change) => {
        const data: IMessage = <IMessage>change.doc.data();
        const id: string = change.doc.id;
        const currMessage: IMessage = { ...data, id };
        messages.push(currMessage);
      });
    });
    return new BehaviorSubject(messages).asObservable();
  }

  public addRoom(roomName: string, userId: string): void {
    const newRoomRef = collection(this.db, 'rooms', '');

    addDoc(newRoomRef, { roomName, userId });
  }

  public sendMessage(userId: string, body: string, roomId: string) {
    const messagesRef = collection(this.db, 'rooms', roomId, 'messages');
    addDoc(messagesRef, { body, userId, timeStamp: new Date().getTime() });
  }
}
