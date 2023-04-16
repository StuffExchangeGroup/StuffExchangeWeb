import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/modules/auth/models/IUser';
import { PopupUpdateAvatarComponent } from '../popup-update-avatar/popup-update-avatar.component';

@Component({
    selector: 'app-side-bar-profile',
    templateUrl: './side-bar-profile.component.html',
    styleUrls: ['./side-bar-profile.component.scss']
})
export class SideBarProfileComponent implements OnInit {

    @Input() user?: User;

    constructor(
        private popUpUpdateAvatar: MatDialog
    ) { }

    ngOnInit(): void {
    }

    onOpenPopupProfile() {
        this.popUpUpdateAvatar.open(PopupUpdateAvatarComponent, { disableClose: true });
    }
}
