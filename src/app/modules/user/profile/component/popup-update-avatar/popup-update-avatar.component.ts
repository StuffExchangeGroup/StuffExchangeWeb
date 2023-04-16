import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { IDataResponse } from 'src/app/common/models/data-response';
import { IFileRes } from 'src/app/common/models/IFileRes';
import { AuthService } from 'src/app/common/services/auth.service';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { Profile } from '../../edit-profile/models/IProfile';
import { ProfileService } from '../../edit-profile/services/profile.service';
import { IAvatarRes } from '../../models/IAvatar';

@Component({
    selector: 'app-popup-update-avatar',
    templateUrl: './popup-update-avatar.component.html',
    styleUrls: ['./popup-update-avatar.component.scss']
})
export class PopupUpdateAvatarComponent implements OnInit {

    public isLoading: boolean = false;
    public tempUrlAvatar?: string;
    public newAvatarFormData: FormData = new FormData();
    public upLoadImageRes?: IAvatarRes;

    constructor(
        private dialogRef: MatDialogRef<PopupUpdateAvatarComponent>,
        private profileService: ProfileService,
        private toastrService: CustomToastrService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
    }

    onSelectFile(e: any) {
        if (e.target.files) {
            // maximum byte of image is allowed (5mb)
            const size_max = 5242880;
            if (e.target.files[0].size > size_max) {
                this.toastrService.error("UpLoad ảnh lỗi", "Ảnh không được vượt quá 5MB");
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (events: any) => {
                this.tempUrlAvatar = events.target.result;
            }
            this.newAvatarFormData.append("avatar", e.target.files[0], e.target.files[0].name);
        }
    }

    async onUpdateAvatar() {
        this.isLoading = true;
        let isUploadAvatarSuccess = await this.uploadImage();
        if (isUploadAvatarSuccess) {
            let profile: Profile = new Profile();
            let newAvatarUrl = this.upLoadImageRes?.avatar ? this.upLoadImageRes.avatar.linkImage : "";
            profile.setAvatar = newAvatarUrl;
            this.profileService.partialUpdateAvatarProfile(profile).subscribe({
                next: (res) => {
                    let newIUser = this.authService.getUser;
                    newIUser.avatar = res.data.data.avatar
                    this.authService.updateUser(newIUser);
                    this.toastrService.success("Cập nhật ảnh đại diện thành công", "");
                    this.closePopUp();
                },
                error: () => {
                    this.toastrService.error("Có lỗi xảy ra, vui lòng thử lại sau!", "");
                    this.isLoading = false;
                    this.closePopUp();
                },
                complete: () => {
                    this.isLoading = false;
                    this.closePopUp();
                }
            });
        } else {
            this.toastrService.error("Cập nhật thất bại", "");
            this.isLoading = false;
        }
    }

    async uploadImage(): Promise<Boolean> {
        try {
            const upLoadImageObservable = this.profileService.upLoadAvatar(this.newAvatarFormData);
            const upLoadImageRes: IDataResponse<IAvatarRes> = await lastValueFrom(upLoadImageObservable);
            if (upLoadImageRes.isSuccess) {
                this.upLoadImageRes = upLoadImageRes.data;
                return true;
            }
            return false;
        } catch (error) {
            console.log(error)
            this.toastrService.error("UpLoad ảnh lỗi", "Có lỗi xảy ra trong qua trình upload ảnh");
            return false;
        }
    }

    closePopUp() {
        this.dialogRef.close();
    }
}
