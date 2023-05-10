import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from 'src/app/common/models/user-login-model';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  @Input() set user(value: IUser | undefined) {
    if (value && value.id) {
      this.addFormControl(value);
      this.setDataForm(value);
    }
    this._user = value;
  }
  @Input() set showLoadingUserForm(value: boolean) {
    value ? this.spinner.show() : this.spinner.hide()
    this._showLoadingUserForm = value;
  }
  @Input() messageError!: string;


  @Output() submitAddUserFormEvent = new EventEmitter<IUser>();

  public _user?: IUser;
  public _showLoadingUserForm!: boolean;

  public addUserForm!: FormGroup;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.createAddUserForm();
  }

  get email() { return this.addUserForm.get('email'); }

  get uid() { return this.addUserForm.get('uid'); }

  get name() { return this.addUserForm.get('name'); }

  get type() { return this.addUserForm.get('type'); }

  get password() { return this.addUserForm.get('password'); }


  public createAddUserForm(): void {
    this.addUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
      type: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      imgURL: new FormControl('', []),
    });
  }

  private addFormControl(user: IUser): void {
    const uidControl = new FormControl(user.id || '', [
      Validators.required,
      Validators.min(0),
    ]);

    this.addUserForm.addControl('uid', uidControl);
  }

  private setDataForm(user: IUser) {
    this.addUserForm.patchValue({ 
      uid: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      type: user.type,
      imgURL: user.imgURL
    })
  }

  public submitUserForm(): void {
    this.addUserForm.markAllAsTouched();

    if (!this.addUserForm.valid) {
      return;
    }

    if (!this.addUserForm.dirty) {
      return
    }

    this.submitAddUserFormEvent.emit(this.addUserForm.value);
  }

}
