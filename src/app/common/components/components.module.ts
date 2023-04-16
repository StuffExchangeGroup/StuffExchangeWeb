import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteComponent } from './favourite/favourite.component';
import { PopupNotificationComponent } from './popup-notification/popup-notification.component';


@NgModule({
    declarations: [
        FavouriteComponent,
        PopupNotificationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FavouriteComponent
    ]
})
export class CommonComponentsModule { }
