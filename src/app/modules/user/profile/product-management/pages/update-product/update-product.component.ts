import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ImageFile } from '../../models/IImageFile';
import { IProductDetail } from '../../models/IProductDetail';
import { DetailProductService } from '../../services/detail-product.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
    private size_max = 5242880;
    imageLinks: string[] = [];
    public postProductForm!: FormGroup;
    public numberOfFile: number = 0;
    public imageIds: number[] = [];
    public newImagesFormData: FormData = new FormData();
    public fileRes: IFileRes[] = [];

    public categories?: ICategory[];
    public provinces?: IProvince[];
    public cities?: ICity[];
    public productId: number = 0;
    public detailProduct?: IProductDetail;
    public imageFiles?: ImageFile[] = [];

    constructor(private categoryService: CategoryService,
        private provinceCityService: ProvinceCityService,
        private productService: ProductService,
        private uploadImageService: UploadImageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService,
        private activatedRoute: ActivatedRoute,
        private detailProductService: DetailProductService,
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.productId = params['id'];
        });
        this.createFormPostProduct();
        this.getDetailProduct();

        this.getCategories();
        this.getProvinces();
    }

    getDetailProduct() {
        this.detailProductService.queryDetailProduct(this.productId).subscribe({
            next: (res) => {
                this.detailProduct = res.data.product;
                this.getCityByStateId(this.detailProduct?.stateId);

                this.imageLinks = res.data.product.imageLinks;
                this.numberOfFile = this.imageLinks.length;
                this.getImageIdFromUrl(this.imageLinks);

                // set value of product for FormGroup
                this.postProductForm.patchValue(this.detailProduct);

                // set purpose for FormControl purpose
                if (this.detailProduct.isGift) {
                    this.postProductForm.patchValue({ purposeIds: "4" });
                } else {
                    if (this.detailProduct.isExchange) {
                        this.postProductForm.patchValue({ purposeIds: "2" });
                    }
                }
            },
            error: (res) => {
                console.log(res)
            },
            complete: () => {

            }
        });
    }

    getImageIdFromUrl(imageLinks: string[]) {
        imageLinks.forEach(imageLink => {
            const imageId = parseInt(imageLink.split('/').pop()!);
            this.imageIds.push(imageId);
        });
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

    onSelectProvince(stateId: any) {
        this.provinceCityService.getCityByStateId(stateId.target.value).subscribe({
            next: (res) => {
                this.cities = res.data.cities;
            }
        });
    }

    getCityByStateId(stateId: any) {
        this.provinceCityService.getCityByStateId(stateId).subscribe({
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
            categoryId: new FormControl('', [
                Validators.required
            ]),
            productCondition: new FormControl('', [
                Validators.required
            ]),
            cityId: new FormControl('', [
                Validators.required
            ]),
            stateId: new FormControl('', [
                Validators.required
            ]),
            purposeIds: new FormControl('', [
                Validators.required
            ]),
            description: new FormControl('', [
                Validators.required
            ]),
            notice: new FormControl(),
            status: new FormControl()
        });
    }
    get title() {
        return this.postProductForm.get('title');
    }
    get categoryId() {
        return this.postProductForm.get('categoryId');
    }
    get productCondition() {
        return this.postProductForm.get('productCondition');
    }
    get cityId() {
        return this.postProductForm.get('cityId');
    }
    get stateId() {
        return this.postProductForm.get('stateId');
    }
    get purposeIds() {
        return this.postProductForm.get('purposeIds');
    }
    get description() {
        return this.postProductForm.get('description');
    }
    get status() {
        return this.postProductForm.get('status');
    }
    get notice() {
        return this.postProductForm.get('notice');
    }

    async OnSubmit() {

        this.postProductForm.markAllAsTouched();

        if (!this.postProductForm.valid) {
            this.toastrService.error("Thông tin chưa đầy đủ", "Vui lòng cung cấp đầy đủ thông tin sản phẩm");
            return;
        }
        this.spinner.show();

        // call function upload image
        const result = await this.upLoadFile();
        if (result === true) {
            const title = this.postProductForm.value.title;
            const categoryId = this.postProductForm.value.categoryId;
            const cityId = this.postProductForm.value.cityId;
            const status = this.postProductForm.value.status;
            const condition = this.postProductForm.value.productCondition;
            const description = this.postProductForm.value.description;
            const notice = this.postProductForm.value.notice;
            const purposeIds: number[] = [this.postProductForm.value.purposeIds];

            let productReq = new ProductReq(this.productId, categoryId, title, description, status, condition, purposeIds, cityId, notice, this.imageIds);

            this.productService.putProduct(productReq).subscribe({
                next: (res: any) => {
                    if (res.isSuccess) {
                        this.toastrService.success("Cập nhật sản phẩm thành công", "");
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
                        this.imageLinks.push(events.target.result);
                    }
                    // this.newImagesFormData.append("file", e.target.files[i], e.target.files[i].name);
                    const imageFile = new ImageFile(e.target.files[i], e.target.files[i].name);
                    this.imageFiles?.push(imageFile);
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
            if (!this.newImagesFormData.has("file") && this.imageIds.length <= 0) {
                this.toastrService.error("Vui lòng chọn ảnh", "");
                return false;
            }

            if (!this.newImagesFormData.has("file")) {
                return true;
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
        if (indexImage > this.imageIds.length - 1) {
            this.imageFiles?.splice(indexImage - this.imageIds.length - 1, 1);
        }
        this.imageLinks.splice(indexImage, 1);
        this.imageIds.splice(indexImage, 1);
        if (this.numberOfFile > 0) {
            this.numberOfFile--;
        }
    }

    trackId(indexImage: number) {
        return indexImage;
    }

}
