import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from 'src/app/common/models/user-login-model';
import { IListUserReponse } from '../../models/IUser';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() listUser?: IListUserReponse;
  @Input() set showLoadingUser(value: boolean) {
    value ? this.spinner.show() : ''
    this._showLoadingUser = value;
  }

  @Output() editUserEvent = new EventEmitter<string>();
  @Output() deleteUserEvent = new EventEmitter<string>();

  public _showLoadingUser!: boolean; 

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {}

  public editUser(user: IUser): void { 
    this.editUserEvent.emit(user.uid)
  }

  public deleteUser(user: IUser): void { 
    this.deleteUserEvent.emit(user.uid)
  }
}
