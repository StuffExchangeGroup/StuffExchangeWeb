import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserLogin } from 'src/app/common/models/user-login-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    @Input() messageError!: string;
    @Input() set showLoadingLogin(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide()
        this._showLoadingLogin = value;
    }

    @Output() submitLoginFormEvent = new EventEmitter<IUserLogin>();

    public _showLoadingLogin!: boolean;
    public loginForm!: FormGroup;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.createLoginForm();
    }

    get username() { return this.loginForm.get('username'); }

    get password() { return this.loginForm.get('password'); }

    public createLoginForm(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
        });
    }

    public submitLogin(): void {
        this.loginForm.markAllAsTouched();

        if (!this.loginForm.valid) {
            return;
        }

        if (!this.loginForm.dirty) {
            return
        }
        this.submitLoginFormEvent.emit(this.loginForm.value);
    }
}
