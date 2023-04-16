import { ImageFile } from './../../models/IImageFile';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { Status } from 'src/app/common/enum/status-product';
import { ICategory } from 'src/app/common/models/ICategory';
import { ICity } from 'src/app/common/models/ICity';
import { IFileRes } from 'src/app/common/models/IFileRes';
import { IProvince } from 'src/app/common/models/IProvince';
import { CategoryService } from 'src/app/common/services/category.service';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { ProvinceCityService } from 'src/app/common/services/province-city.service';
import { ProductService } from 'src/app/modules/user/product-list/services/product.service';
import { UploadImageService } from 'src/app/modules/user/product-list/services/upload-image.service';
import { ProductReq } from '../../../models/IPostProduct';

@Component({
    selector: 'app-post-product',
    templateUrl: './post-product.component.html',
    styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
    private size_max = 5242880;

    urls: string[] = [];
    public postProductForm!: FormGroup;
    public numberOfFile: number = 0;
    public imageIds: number[] = [];
    public newImagesFormData: FormData = new FormData();
    public fileRes: IFileRes[] = [];

    public categories?: ICategory[];
    public provinces?: IProvince[];
    public cities?: ICity[];
    public imageFiles?: ImageFile[] = [];

    constructor(private categoryService: CategoryService,
        private provinceCityService: ProvinceCityService,
        private productService: ProductService,
        private uploadImageService: UploadImageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService
    ) { }

    ngOnInit(): void {
        this.createFormPostProduct();
        this.getCategories();
        this.getProvinces();
    }

    getCategories() {
        this.categoryService.getAll().subscribe({
            next: (res) => {
                this.categories = res.data.categories;
            }
        });
    }

    getProvinces() {
        this.provinceCityService.getAllProvinces().subscribe({
            next: (res) => {
                this.provinces = res.data.states;
            }
        });
    }

    getCityByStateId(stateId: any) {
        this.provinceCityService.getCityByStateId(stateId.target.value).subscribe({
            next: (res) => {
                this.cities = res.data.cities;
            }
        });
    }

    createFormPostProduct() {
        this.postProductForm = new FormGroup({
            title: new FormControl('', [
                Validators.required
            ]),
            category: new FormControl('', [
                Validators.required
            ]),
            condition: new FormControl('', [
                Validators.required
            ]),
            city: new FormControl('', [
                Validators.required
            ]),
            province: new FormControl('', [
                Validators.required
            ]),
            purposeIds: new FormControl('', [
                Validators.required
            ]),
            description: new FormControl('', [
                Validators.required
            ]),
            note: new FormControl()
        });
    }
    get title() {
        return this.postProductForm.get('title');
    }
    get category() {
        return this.postProductForm.get('category');
    }
    get condition() {
        return this.postProductForm.get('condition');
    }
    get city() {
        return this.postProductForm.get('city');
    }
    get province() {
        return this.postProductForm.get('province');
    }
    get purposeIds() {
        return this.postProductForm.get('purposeIds');
    }
    get description() {
        return this.postProductForm.get('description');
    }

    async onSubmit() {

        this.postProductForm.markAllAsTouched();

        if (!this.postProductForm.valid) {
            this.toastrService.error("Thông tin chưa đầy đủ", "Vui lòng cung cấp đầy đủ thông tin sản phẩm");
            return;
        }

        if (!this.postProductForm.dirty) {
            return
        }
        this.spinner.show();

        // call function upload image
        const result = await this.upLoadFile();
        if (result === true) {

            const title = this.postProductForm.value.title;
            const categoryId = this.postProductForm.value.category;
            const cityId = this.postProductForm.value.city;
            const condition = this.postProductForm.value.condition;
            const description = this.postProductForm.value.description;
            const notice = this.postProductForm.value.note;
            const purposeIds: number[] = [this.postProductForm.value.purposeIds];

            let productReq = new ProductReq(0, categoryId, title, description, Status.AVAILABLE, condition, purposeIds, cityId, notice, this.imageIds);

            this.productService.postProduct(productReq).subscribe({
                next: (res: any) => {
                    if (res.isSuccess) {
                        this.toastrService.success("Đã tạo mới sản phẩm", "Sản phẩm của bạn đã được đăng thành công");
                        this.router.navigate(['/profile/product/detail/' + res.data.product.id])
                    }
                },
                error: (e) => {
                    this.spinner.hide();
                },
                complete: () => {
                    this.spinner.hide();
                }
            });
        } else {
            this.spinner.hide();
        }
    }

    onSelectFile(e: any) {
        if (e.target.files) {
            let currentNumberOfFile = e.target.files.length;

            if ((this.numberOfFile + currentNumberOfFile) > 5) {
                this.toastrService.info("Không thành công", "Bạn chỉ được upload tối đa 5 ảnh")
                return;
            }

            for (let i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i].size > this.size_max) {
                    this.toastrService.error("Ảnh không hợp lệ", `Ảnh thứ ${i + 1} của bạn vượt quá 5MB`);
                    currentNumberOfFile--;
                } else {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[i]);
                    reader.onload = (events: any) => {
                        this.urls.push(events.target.result);
                    }

                    const imageFile = new ImageFile(e.target.files[i], e.target.files[i].name);
                    this.imageFiles?.push(imageFile);
                    // this.newImagesFormData.append("file", e.target.files[i], e.target.files[i].name);
                }
            }
            this.numberOfFile += currentNumberOfFile;
        }
    }

    async upLoadFile(): Promise<Boolean> {

        for (let imageFile of this.imageFiles!) {
            this.newImagesFormData.append('file', imageFile.file, imageFile.name);
        }

        try {
            if (!this.newImagesFormData.has("file")) {
                this.toastrService.error("Vui lòng chọn ảnh", "");
                return false;
            }
            const upLoadImageObservable = this.uploadImageService.upLoadImage(this.newImagesFormData);
            const upLoadImageRes: IFileRes[] = await lastValueFrom(upLoadImageObservable);
            if (upLoadImageRes.length > 0) {
                this.fileRes = upLoadImageRes;
                this.fileRes.forEach((file) => {
                    this.imageIds.push(file.id);
                });
                return true;
            }
            return false;
        } catch (error) {
            this.toastrService.error("UpLoad ảnh lỗi", "Có lỗi xảy ra trong quá trình upload ảnh");
            return false;
        }
    }

    onRemoveFile(indexImage: number) {
        this.urls.splice(indexImage, 1);

        if (this.numberOfFile > 0) {
            this.numberOfFile--;
        }

        this.imageFiles?.splice(indexImage, 1);

        // let currentFormData = this.newImagesFormData.getAll("file");
        // currentFormData.splice(indexImage, 1);
        // this.newImagesFormData.append("file", currentFormData);
        // this.newImagesFormData.delete("file")
    }

    trackId(indexImage: number) {
        return indexImage;
    }

}
