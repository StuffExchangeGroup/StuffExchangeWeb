import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { getDatabase, ref, onValue, remove, query, limitToLast } from "firebase/database";
import { lastValueFrom, Observable } from "rxjs";
import { IUserFirebase } from "../models/firebase-message-models/user";
import { IProductFirebase } from "../models/firebase-message-models/product";
import { IRoomFirebaseReq, IRoomFirebaseRes } from "../models/firebase-message-models/room";
import { IMessageReq } from "../models/firebase-message-models/message";
import { initializeApp } from "firebase/app";

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    public baseUrl = environment.baseURl;
    public app = initializeApp(environment.firebase);
    public firebaseDB: any;
    public firebaseUrl: string = 'https://notification-69f68-default-rtdb.asia-southeast1.firebasedatabase.app/';

    constructor(
        private httpClient: HttpClient,
        private httpBackend: HttpBackend) {

        this.httpClient = new HttpClient(this.httpBackend);
        this.firebaseDB = getDatabase(this.app);
    }

    public hasData(obj: Record<string, any>): boolean {
        return Object.keys(obj).length !== 0;
    }

    public getRoomsByMyProductId(myProductId: number): Observable<IRoomFirebaseRes> {
        return this.httpClient.get<IRoomFirebaseRes>(this.firebaseUrl + 'rooms.json?orderBy="ownerProduct/productId"&equalTo=' + myProductId + '&print=pretty');
    }

    public getRoomsByExchangeProductId(exchangeProductId: number): Observable<IRoomFirebaseRes> {
        return this.httpClient.get<IRoomFirebaseRes>(this.firebaseUrl + 'rooms.json?orderBy="exchangeProduct/productId"&equalTo=' + exchangeProductId + '&print=pretty');
    }

    public getRoomsByKey(ownerProductId: string, exchangeProductId: string): Observable<any> {
        const roomKey = `room_${ownerProductId}_${exchangeProductId}`;
        return this.httpClient.get<any>(this.firebaseUrl + 'rooms.json?orderBy="$key"&equalTo="' + roomKey + '"&print=pretty');
    }

    public async hasRoomsByKey(ownerProductId: string, exchangeProductId: string): Promise<boolean> {
        let hasRoomInFirebase = false;
        const getRoomByOwnerKey = await lastValueFrom(this.getRoomsByKey(ownerProductId, exchangeProductId));
        const getRoomByExchangeKey = await lastValueFrom(this.getRoomsByKey(exchangeProductId, ownerProductId));

        if (this.hasData(getRoomByOwnerKey) || this.hasData(getRoomByExchangeKey)) {
            hasRoomInFirebase = true;
        }
        return hasRoomInFirebase;
    }

    public getRoomById(roomId: string): Observable<IRoomFirebaseRes> {
        return this.httpClient.get<IRoomFirebaseRes>(this.firebaseUrl + 'rooms.json?orderBy="roomID"&equalTo="' + roomId + '"&print=pretty');
    }


    public getUserById(userId: string): Observable<any> {
        return this.httpClient.get(this.firebaseUrl + 'products.json?orderBy="userID"&equalTo="' + userId + '"&print=pretty');
    }

    public async hasUserFirebase(userId: string): Promise<boolean> {
        let hasUserInFirebase = false;
        const getUserById = await lastValueFrom(this.getUserById(userId));

        if (this.hasData(getUserById)) {
            hasUserInFirebase = true;
        }
        return hasUserInFirebase;
    }

    public createUser(user: IUserFirebase) {
        return this.httpClient.put(this.firebaseUrl + `users/user_${user.userID}.json`, user);
    }

    public createRoom(room: IRoomFirebaseReq) {
        return this.httpClient.put(this.firebaseUrl + `rooms/room_${room.ownerProduct.productId}_${room.exchangeProduct.productId}.json`, room);
    }

    public deleteRoom(ownerProductId: number, exchangeProductId: number) {
        const roomRef = this.getRoomRef(ownerProductId, exchangeProductId);
        return remove(roomRef);
    }

    public createMessage(message: IMessageReq, ownerProductId: number, exchangeProductId: number) {
        return this.httpClient.post(this.firebaseUrl + `messages/messages_${ownerProductId}_${exchangeProductId}.json`, message);
    }

    public getMessageByKey(key: string): Observable<any> {
        return this.httpClient.get(this.firebaseUrl + 'messages.json?orderBy="$key"&equalTo="' + key + '"&print=pretty');
    }

    public getLastMessageByKey(key: string) {
        return query(ref(this.firebaseDB, 'messages/' + key), limitToLast(1));
    }

    public getMessagesRef(ownerProductId?: number, exchangeProductId?: number) {
        const messageKey = `messages_${ownerProductId}_${exchangeProductId}`;
        return ref(this.firebaseDB, "messages/" + messageKey);
    }

    public getRoomRef(ownerProductId?: number, exchangeProductId?: number) {
        const roomKey = `room_${ownerProductId}_${exchangeProductId}`;
        return ref(this.firebaseDB, "rooms/" + roomKey);
    }
}
