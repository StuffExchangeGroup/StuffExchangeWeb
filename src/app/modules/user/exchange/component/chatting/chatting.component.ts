import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { onValue } from 'firebase/database';
import { IMessageRes, MessageReq } from 'src/app/common/models/firebase-message-models/message';
import { IMessageNotification, MessageNotification } from 'src/app/common/models/message-notification';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Component({
    selector: 'app-chatting',
    templateUrl: './chatting.component.html',
    styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit {

    public roomChat_: any;
    public messageForm!: FormGroup;

    public currentUserUID?: string;
    public exchangeUserUID?: string;

    public ownerProductId?: number;
    public exchangeProductId?: number;

    public messageKey = "";
    public messages?: IMessageRes[];
    public currentUser: IUser;

    public exchangerAvatar?: string;
    public ownerAvatar?: string;

    @Output() backToChattingListEvent = new EventEmitter();

    @Input() set roomChat(roomChat: any) {
        if (roomChat) {
            this.roomChat_ = roomChat;

            this.ownerProductId = this.roomChat_.exchangeProduct.productId;
            this.exchangeProductId = this.roomChat_.ownerProduct.productId;

            this.exchangeUserUID = this.roomChat_.exchangeProduct.uid;
            this.exchangerAvatar = this.roomChat_.exchangeProduct.avatarUrl;

            this.messageKey = `messages_${this.ownerProductId}_${this.exchangeProductId}`;

            if (this.currentUserUID?.endsWith(this.exchangeUserUID!)) {
                this.exchangeUserUID = this.roomChat_.ownerProduct.uid;
                this.exchangerAvatar = this.roomChat_.ownerProduct.avatarUrl;
            }

            this.getMessages();
        }
    }

    constructor(
        private firebaseService: FirebaseService,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {
        console.log(this.authService.getUser)
        this.currentUser = this.authService.getUser;
    }

    ngOnInit(): void {
        this.messageForm = new FormGroup({
            message: new FormControl('', [
                Validators.required
            ]),
        });
        this.currentUserUID = this.currentUser.uid;
        this.ownerAvatar = this.currentUser.avatar;
    }

    get message() {
        return this.messageForm.get('message');
    }

    onSendMessage(event: any) {
        console.log(this.ownerProductId, this.currentUserUID, this.exchangeProductId);
        console.log(this.messageForm.valid, this.messageForm.dirty);
        event.preventDefault()
        if (!this.ownerProductId || !this.currentUserUID || !this.exchangeProductId) {
            return;
        }

        if (!this.messageForm.valid || !this.messageForm.dirty) {
            return;
        }

        const message = this.message?.value;

        const messagesNotification = new MessageNotification(message, this.currentUserUID, this.exchangeUserUID);


        const messageReq = new MessageReq(message, new Date().getTime(), this.currentUserUID);

        this.firebaseService.createMessage(messageReq, this.ownerProductId!, this.exchangeProductId!).subscribe({
            next: (res) => {
                this.scrollConversationToBottom();
                this.messageForm.reset();
                this.pushMessagesNotification(messagesNotification);
            },
            complete: () => {
                this.messageForm.reset();
            }
        });
    }

    public pushMessagesNotification(messagesNotification: IMessageNotification) {
        this.notificationService.pushMessageNotification(messagesNotification).subscribe({
            next: (res) => {
                console.log(res);
            }
        });
    }

    public getMessages() {
        const messagesRef = this.firebaseService.getMessagesRef(this.ownerProductId, this.exchangeProductId);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.messages = Object.values(data);

                //add event scroll to bottom chat history
                const element = document.getElementById('messages')
                if (element) {
                    new ResizeObserver(this.scrollConversationToBottom).observe(element)
                }
            }
        });
    }

    backToChattingList() {
        this.backToChattingListEvent.emit();
    }

    public getTime(timestamp: number) {
        // console.log(timestamp);
        const getDate = new Date(timestamp);
        return `${this.padTo2Digits(getDate.getHours())}:${this.padTo2Digits(getDate.getMinutes())}`;
    }

    public padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
    }

    public scrollConversationToBottom() {
        const element = document.getElementById("messages");
        element!.scrollTop = element?.scrollHeight ?? 0;
    }

    public changeSizeHandler() {
        console.log("hellooooooooooooooooooo");

        this.scrollConversationToBottom();
    }
}