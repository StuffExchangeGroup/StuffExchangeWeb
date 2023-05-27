import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICategory } from '../../models/ICategory';

@Component({
    selector: 'app-add-category-form',
    templateUrl: './add-category-form.component.html',
    styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent implements OnInit {
    @Input() set category(value: ICategory | undefined) {
        if (value && value.id) {
            this.addFormControl(value);
            this.setDataForm(value);
        }
        this._category = value;
    }
    @Input() set showLoadingCategoryForm(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide()
        this._showLoadingUserForm = value;
    }
    @Input() messageError!: string;


    @Output() submitAddCategoryFormEvent = new EventEmitter<ICategory>();

    public _category?: ICategory;
    public _showLoadingUserForm!: boolean;

    public addCategoryForm!: FormGroup;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.createAddUserForm();
    }

    get id() { return this.addCategoryForm.get('id'); }

    get name() { return this.addCategoryForm.get('name'); }

    get thumbnail() { return this.addCategoryForm.get('thumbnail'); }

    get active() { return this.addCategoryForm.get('active'); }

    get description() { return this.addCategoryForm.get('description'); }


    public createAddUserForm(): void {
        this.addCategoryForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
            ]),
            thumbnail: new FormControl('', [
                Validators.required,
            ]),
            description: new FormControl('', [
                Validators.required,
            ]),
            active: new FormControl('', [
                Validators.required,
            ]),
        });
    }

    private addFormControl(user: ICategory): void {
        const uidControl = new FormControl(user.id || '', [
            Validators.required,
            Validators.min(0),
        ]);

        this.addCategoryForm.addControl('uid', uidControl);
    }

    private setDataForm(category: ICategory) {
        this.addCategoryForm.patchValue({
            uid: category.id,
            name: category.name,
            thumbnail: category.thumbnail,
            description: category.description,
            active: category.active,
        })
    }

    public submitCategoryForm(): void {
        this.addCategoryForm.markAllAsTouched();

        if (!this.addCategoryForm.valid) {
            return;
        }

        if (!this.addCategoryForm.dirty) {
            return
        }

        this.submitAddCategoryFormEvent.emit(this.addCategoryForm.value);
    }

}
