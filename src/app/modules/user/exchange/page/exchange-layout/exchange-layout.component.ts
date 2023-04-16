import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
// import { FirebaseService } from 'src/app/common/services/firebase.service';
import { RoomFirebaseReq } from 'src/app/common/models/firebase-message-models/room';
import { UserFirebase } from 'src/app/common/models/firebase-message-models/user';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { IDetailExchange } from '../../models/IDetailExchange';

@Component({
    selector: 'app-exchange-layout',
    templateUrl: './exchange-layout.component.html',
    styleUrls: ['./exchange-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExchangeLayoutComponent implements OnInit {

    public currentProductId: number = 0;
    public exchangeProductId: number = 0;
    public totalExchange: number = 0;
    public indexTab = 0;
    public isReloadChat = false;

    constructor(
        private firebaseService: FirebaseService
    ) { }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    getCurrentExchangeId(productId: number) {
        this.currentProductId = productId;
    }

    getTotalExchange(totalExchange: number) {
        this.totalExchange = totalExchange;
    }

    onSelectedTab(event: any) {
        if (event.index === 1) {
            this.isReloadChat = !this.isReloadChat;
        }
    }

    // onTabChange(event: any) {
    //     this.isReloadChat = !this.isReloadChat;
    // }

    async startConversationFirebase(detailExchange: IDetailExchange) {
        this.exchangeProductId = detailExchange.exchangeProduct.productId;

        console.log(detailExchange);
        if (!detailExchange.chatting) {
            const a = this.firebaseService.deleteRoom(detailExchange.myProduct.productId, detailExchange.exchangeProduct.productId);
            return;
        }
        const exchangeUser = new UserFirebase(detailExchange.exchangeProduct.avatarUrl, detailExchange.exchangeProduct.username, detailExchange.exchangeProduct.uid);
        await this.createUser(exchangeUser);

        const ownerUser = new UserFirebase(detailExchange.myProduct.avatarUrl, detailExchange.myProduct.username, detailExchange.myProduct.uid);
        await this.createUser(ownerUser);

        // const roomName = "Room chat of " + detailExchange.myProduct.productName;
        const image = detailExchange.myProduct.thumbnail;
        // const ownerProductID = `${detailExchange.myProduct.productId}`;
        // const exchangeProductID = `${detailExchange.exchangeProduct.productId}`;
        const roomID = `room_${detailExchange.myProduct.productId}_${detailExchange.exchangeProduct.productId}`;
        const type = `room`;
        // const ownerID = `${detailExchange.myProduct.uid}`;
        // const exchangeID = `${detailExchange.exchangeProduct.uid}`;

        const newRoomFirebase = new RoomFirebaseReq(image, roomID, type, new Date(Date.now()), detailExchange.myProduct, detailExchange.exchangeProduct);
        this.createRoom(newRoomFirebase);
    }

    public async createRoom(newRoomFirebase: RoomFirebaseReq) {
        const hasRoomInFirebase =
            await this.firebaseService.hasRoomsByKey(
                newRoomFirebase.ownerProduct.productId.toString(),
                newRoomFirebase.exchangeProduct.productId.toString()
            );
        if (!hasRoomInFirebase) {
            this.firebaseService.createRoom(newRoomFirebase).subscribe({
                next: (res) => {
                    console.log(res);
                    this.indexTab = 1;
                },
                error: (e) => {
                    console.log(e);
                }
            });
        }
    }



    public async createUser(newUser: UserFirebase) {
        const hasUserInFirebase = await this.firebaseService.hasUserFirebase(newUser.userID);
        if (!hasUserInFirebase) {
            const userRes = await lastValueFrom(this.firebaseService.createUser(newUser));
            console.log(userRes);
            // .subscribe({
            //     next: (res) => {
            //         console.log(res);
            //     },
            //     error: (e) => {
            //         console.log(e);
            //     }
            // });
        } else {
            console.log("exists")
        }
    }
}
