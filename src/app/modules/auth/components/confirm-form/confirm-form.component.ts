import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IConfirmOTPReq } from '../../models/IConfirmOTPReq';
import { IConfirmOTPRes } from '../../models/IConfirmOTPRes';

@Component({
    selector: 'app-confirm-form',
    templateUrl: './confirm-form.component.html',
    styleUrls: ['./confirm-form.component.scss']
})
export class ConfirmFormComponent implements OnInit {

    @Input() messageError!: string | undefined;
    @Input() set showLoadingConfirm(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
        this._showLoadingConfirm = value;
    }
    @Input() confirmOTPReq!: IConfirmOTPReq;

    @Output() submitConfirmFormEvent = new EventEmitter<number>();
    @Output() submitResendOTPEvent = new EventEmitter();

    public confirmForm!: FormGroup
    public _showLoadingConfirm = false;

    constructor(private spinner: NgxSpinnerService) {
    }

    ngOnInit(): void {
        this.createConfirmForm();
    }

    public createConfirmForm(): void {
        this.confirmForm = new FormGroup({
            otp: new FormControl('', [Validators.required, Validators.pattern("[0-9]{4}")])
        })
    }

    get otp() {
        return this.confirmForm?.get('otp')
    }

    public onSubmit(): void {
        this.confirmForm.markAllAsTouched();

        if (!this.confirmForm.valid) {
            return;
        }

        if (!this.confirmForm.dirty) {
            return
        }

        this.submitConfirmFormEvent.emit(this.otp?.value);
    }

    public onResendOTP(): void {
        this.submitResendOTPEvent.emit();
    }
}
