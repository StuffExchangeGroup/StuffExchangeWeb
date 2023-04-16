import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Component({
    selector: 'app-show-contact',
    templateUrl: './show-contact.component.html',
    styleUrls: ['./show-contact.component.scss']
})
export class ShowContactComponent implements OnInit {

    @Input() user?: IUser;

    constructor(private authService: AuthService) { }

    @Output() updateContactEvent = new EventEmitter<string>();

    ngOnInit(): void {
        if (this.user?.phone) {
            this.user.phone = this.user.phone.replace('+84', '0');
        }
    }

    onEdit(str: string) {
        this.updateContactEvent.emit(str);
    }
}
