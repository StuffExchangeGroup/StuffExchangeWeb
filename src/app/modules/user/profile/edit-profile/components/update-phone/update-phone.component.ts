import { User } from './../../../../../auth/models/IUser';
import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/IProfile';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
    selector: 'app-update-phone',
    templateUrl: './update-phone.component.html',
    styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {

    public phoneUpdateForm: FormGroup;
    public messageError: string | undefined;

    @Input() user!: User;

    @Output() updateUserEvent = new EventEmitter<User>();

    set showLoadingUpdate(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
    }

    constructor(private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private profileService: ProfileService,
        private authService: AuthService) {
        this.phoneUpdateForm = this.formBuilder.group({
            phone: ['', [Validators.required, Validators.pattern("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")]]
        })
    }

    @Output() hideUpdatePhoneFormEvent = new EventEmitter<void>();

    ngOnInit(): void {
        this.showLoadingUpdate = false;
        this.phoneUpdateForm.controls['phone'].setValue(this.user.phone);
    }

    get phone() {
        return this.phoneUpdateForm?.get('phone');
    }

    onUpdatePhone() {
        this.phoneUpdateForm.markAllAsTouched();
        if (!this.phoneUpdateForm.valid) {
            return;
        }
        if (!this.phoneUpdateForm.dirty) {
            return;
        }

        //show loading
        this.showLoadingUpdate = true;

        //call api update profile
        const profile = new Profile();
        profile.phone = '+84' + this.phone?.value;

        this.profileService.partialUpdateProfile(profile).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.user.phone = '0' + this.phone?.value;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.updateUserEvent.emit(this.user);
                }
            },
            error: (e) => {
                this.showLoadingUpdate = false;
                const res = e.error;
                this.messageError = res.errorMessage.message;
                return;
            },
            complete: () => {
                this.messageError = undefined;
                this.showLoadingUpdate = false;
                this.hideUpdatePhoneFormEvent.emit();
            }
        })
    }

    onCancel() {
        this.hideUpdatePhoneFormEvent.emit();
        this.phoneUpdateForm.controls['phone'].setValue(this.user.phone);
    }

}
