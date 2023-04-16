import { NgxSpinnerService } from 'ngx-spinner';
import { Profile } from './../../models/IProfile';
import { User } from './../../../../../auth/models/IUser';
import { ProfileService } from './../../services/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-update-email',
    templateUrl: './update-email.component.html',
    styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
    public emailUpdateForm: FormGroup;
    public errorMessage: string | undefined;
    set updateLoading(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide()
    }

    @Input() user!: User;

    @Output() hideUpdateEmailFormEvent = new EventEmitter<void>();
    @Output() showConfirmOTPFormEvent = new EventEmitter<string>();
    @Output() updateUserEvent = new EventEmitter<User>();

    constructor(private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private spinner: NgxSpinnerService) {
        this.emailUpdateForm = formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    ngOnInit(): void {
        this.emailUpdateForm.controls['email'].setValue(this.user.email)
    }

    get email() {
        return this.emailUpdateForm.get('email');
    }

    onContinue() {
        this.updateLoading = true;
        const email = this.emailUpdateForm.get('email')?.value;

        this.profileService.checkExistEmail(email).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.showConfirmOTPFormEvent.emit(email);
                }
            },
            error: (e) => {
                this.errorMessage = e.error.errorMessage.message;
                this.updateLoading = false
            },
            complete: () => this.updateLoading = false
        })
    }

    onCancel() {
        this.hideUpdateEmailFormEvent.emit();
        this.emailUpdateForm.controls['email'].setValue(this.user.email)
    }
}
