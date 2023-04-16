import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { IUser } from 'src/app/common/models/user-login-model';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() currentUser?: IUser;

  @Output() logoutEvent = new EventEmitter<void>();
  
  public focus: any;
  public listTitles!: any[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }

  public getTitle(): string {
    return this.activatedRoute.snapshot.firstChild?.data['moduleName'];
  }

  public logout(): void {
    this.logoutEvent.emit();
  }
}
