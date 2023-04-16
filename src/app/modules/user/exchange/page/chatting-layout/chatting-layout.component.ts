import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/common/services/firebase.service';

@Component({
    selector: 'app-chatting-layout',
    templateUrl: './chatting-layout.component.html',
    styleUrls: ['./chatting-layout.component.scss']
})
export class ChattingLayoutComponent implements OnInit {
    public isChatting: boolean = false;
    public isShowChattingList: boolean = true;
    public isShowConversation: boolean = false;

    @Input() currentProductId: number = 0;
    @Input() isReloadChat = false;

    public roomChat: any;

    constructor(
        private firebaseService: FirebaseService
    ) { }

    ngOnInit(): void {
        // this.getRoomsByProductId();
    }

    getInRoomChatting() {
        this.isChatting = !this.isChatting;
    }

    selectConversationHandler(roomChat: any) {
        this.roomChat = roomChat;
        this.isShowChattingList = false;
        this.isShowConversation = true;
    }

    backToChattingListHandler() {
        this.isShowChattingList = true;
        this.isShowConversation = false;
    }

}
