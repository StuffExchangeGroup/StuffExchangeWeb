import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ISignUpReq } from '../../models/ISignUpReq';
import { ConfirmedValidator } from '../../validator/confirmed.validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

    @Input() messageError!: string | undefined;
    @Input() set showLoadingSignUp(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide()
        this._showLoadingSignUp = value;
    }

    @Output() submitSignUpFormEvent = new EventEmitter<ISignUpReq>();

    public signUpForm!: FormGroup;
    public _showLoadingSignUp = false;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.createSignUpForm();
    }

    public createSignUpForm(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phone: new FormControl(null, Validators.pattern("[0-9]{10}")),
            email: new FormControl('', [Validators.required, Validators.email]),
            userName: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required])
        },
            { validators: ConfirmedValidator.passwordMatch('password', 'confirmPassword') }
        );
    }

    get firstName() {
        return this.signUpForm.get('firstName');
    }

    get lastName() {
        return this.signUpForm.get('lastName');
    }
    get phone() {
        return this.signUpForm.get('phone');
    }

    get email() {
        return this.signUpForm.get('email');
    }

    get userName() {
        return this.signUpForm.get('userName');
    }

    get password() {
        return this.signUpForm.get('password');
    }

    get confirmPassword() {
        return this.signUpForm.get('confirmPassword');
    }

    public onSubmit(): void {
        this.signUpForm.markAllAsTouched();

        if (!this.signUpForm.valid) {
            return;
        }

        if (!this.signUpForm.dirty) {
            return
        }

        this.submitSignUpFormEvent.emit(this.signUpForm.value);
    }
}


