import { Router } from '@angular/router';
import { CustomToastrService } from './../../../../../../common/services/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from './../../../../../auth/models/IUser';
import { ProfileService } from './../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from './../../models/IProfile';
import { AuthService } from 'src/app/common/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/modules/auth/models/IUser';
// import * as dayjs from 'dayjs';

@Component({
    selector: 'app-update-information',
    templateUrl: './update-information.component.html',
    styleUrls: ['./update-information.component.scss']
})
export class UpdateInformationComponent implements OnInit {

    profile?: Profile;
    public profileUpdateForm: FormGroup;
    @Input() user!: User;

    set showLoadingUpdate(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
    }

    constructor(private authService: AuthService,
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService,
        private router: Router) {
        this.profileUpdateForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            dob: ['']
        })
    }

    ngOnInit(): void {
        this.getProfileInformation();
        this.showLoadingUpdate = false;
    }

    get firstName() {
        return this.profileUpdateForm.get('firstName');
    }

    get lastName() {
        return this.profileUpdateForm.get('lastName');
    }

    get dob() {
        return this.profileUpdateForm.get('dob');
    }

    public getProfileInformation(): void {
        let dateStr: string = '';

        if (this.user.dob) {
            const birthday = new Date(this.user.dob);
            dateStr = birthday.getDate() + '/' + (birthday.getMonth()) + '/' + birthday.getFullYear();
        }

        this.profile = new Profile(this.user.firstName, this.user.lastName,
            new Date(this.user.dob ? this.user.dob : ''));

        if (!this.user.dob) {
            this.profile.dob = '';
        }

        this.profileUpdateForm.setValue(this.profile);
    }

    public updateProfile(): void {
        //check invalid form
        this.profileUpdateForm.markAllAsTouched();
        if (!this.profileUpdateForm.valid) {
            return;
        }
        if (!this.profileUpdateForm.dirty) {
            return
        }

        //show loading
        this.showLoadingUpdate = true;

        const profile: Profile = this.profileUpdateForm.value;

        if (profile.dob == '') {
            profile.dob = null;
        }

        this.profileService.partialUpdateProfile(profile).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.user!.firstName = profile!.firstName || '';
                    this.user!.lastName = profile!.lastName || '';
                    this.user!.dob = profile.dob || null;
                    this.user.displayName = profile.firstName + ' ' + profile.lastName;

                    //set user to localStorage
                    // localStorage.setItem('user', JSON.stringify(this.user));
                    this.authService.updateUser(this.user);
                }
            },
            error: (e) => {
                this.showLoadingUpdate = false;
                console.log(e)
            },
            complete: () => {
                this.showLoadingUpdate = false;
                this.toastrService.success("Thành công", "Cập nhật thông tin thành công");
                this.router.navigateByUrl('/profile/edit');
            }
        })
    }
}
