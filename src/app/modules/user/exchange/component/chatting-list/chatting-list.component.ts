import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { get, onValue } from 'firebase/database';
import { IRoomFirebaseRes } from 'src/app/common/models/firebase-message-models/room';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Component({
    selector: 'app-chatting-list',
    templateUrl: './chatting-list.component.html',
    styleUrls: ['./chatting-list.component.scss']
})
export class ChattingListComponent implements OnInit {

    @Output() selectConversationEvent = new EventEmitter<any>();
    public currentUser: IUser;
    public currentUserUID?: string;

    public currentProductId_?: number;
    @Input() set currentProductId(currentProductId: number) {
        if (currentProductId !== 0) {
            this.currentProductId_ = currentProductId;
            this.chat_lists = [];
            this.getRoomChat(currentProductId);
        }
    }

    @Input() set isReloadChat(isReloadChat: boolean) {
        if (this.currentProductId_) {
            this.chat_lists = [];
            this.getRoomChat(this.currentProductId_);
        }
    }

    public lastMessage: any;
    public chat_lists: any[] = [];

    constructor(private firebaseService: FirebaseService,
        private authService: AuthService) {
        this.currentUser = this.authService.getUser;

    }

    ngOnInit(): void {
        this.currentUserUID = this.currentUser.uid;
    }

    public getRoomChat(currentProductId: number) {
        // console.log(currentProductId)
        this.firebaseService.getRoomsByMyProductId(currentProductId).subscribe({
            next: (res) => {
                this.addToChatList(res);
            }
        });
        this.firebaseService.getRoomsByExchangeProductId(currentProductId).subscribe({
            next: (res) => {
                this.addToChatList(res);
                // console.log(this.chat_lists)
            }
        });
    }

    public addToChatList(chatLists: any) {
        const hasChatList = this.firebaseService.hasData(chatLists);
        if (hasChatList) {
            const getChatLists = Object.values(chatLists);

            getChatLists.forEach((chatList: any) => {

                const lastMessagesQueryOwner = this.getLastMessageQuery(chatList.ownerProduct.productId, chatList.exchangeProduct.productId);

                const lastMessagesQueryExchanger = this.getLastMessageQuery(chatList.exchangeProduct.productId, chatList.ownerProduct.productId);

                this.queryLastMessage(lastMessagesQueryOwner, chatList);

                this.queryLastMessage(lastMessagesQueryExchanger, chatList);

                // call firebase to get last message by room
            });

            this.chat_lists = [...this.chat_lists, ...getChatLists];
        }
    }

    public getLastMessageQuery(ownerProductId: any, exchangeProductId: any) {
        const messagesKey = `messages_${ownerProductId}_${exchangeProductId}`;
        return this.firebaseService.getLastMessageByKey(messagesKey);

    }

    public queryLastMessage(query: any, chatList: any) {
        get(query).then((snapshot) => {
            const lastMessageObject = snapshot.val();
            if (lastMessageObject) {
                const hasLastMessage = this.firebaseService.hasData(snapshot.val());

                if (hasLastMessage) {
                    this.lastMessage = Object.values(lastMessageObject);
                    chatList.lastMessage = this.lastMessage[0];
                    console.log(this.lastMessage[0]);

                }
            }
        });
    }

    public convertDate(timestamp: number) {
        const createdDate = new Date(timestamp);
        const today = new Date();

        const diffMs: any = today.getTime() - createdDate.getTime();
        const diffDays = Math.floor(diffMs / 86400000);
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        if (diffDays < 10 && diffDays > 0) {
            return diffDays + ' ngày trước'
        }

        if (diffHrs < 24 && diffHrs > 0) {
            return diffHrs + ' giờ trước';
        }

        if (diffMins < 60 && diffMins >= 0) {
            return diffMins + ' phúc trước';
        }

        return createdDate.getDate() + '/' + (createdDate.getMonth() + 1) + '/' + createdDate.getFullYear();
    }

    public selectConversation(chat_list: any) {
        this.selectConversationEvent.emit(chat_list);
    }
}
