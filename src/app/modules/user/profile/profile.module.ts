import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from '../profile/profile-layout.component';
import { CommonComponentsModule } from 'src/app/common/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WishListComponent } from './wish-list/wish-list.component';
import { SideBarProfileComponent } from './component/side-bar-profile/side-bar-profile.component';
import { PopupUpdateAvatarComponent } from './component/popup-update-avatar/popup-update-avatar.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
    declarations: [
        ProfileLayoutComponent,
        WishListComponent,
        SideBarProfileComponent,
        PopupUpdateAvatarComponent,
        NotificationListComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        CommonComponentsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ]
})
export class ProfileModule { }
