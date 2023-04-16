import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ICity } from './../../models/ICity';
import { CityService } from './../../services/city.service';
import { CategoryService } from './../../../../../common/services/category.service';
import { ICategory } from './../../../home/models/ICategory';
import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    // uncheck when checkbox reset filter
    @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

    @ViewChildren("categoryCheckboxes") categoryCheckboxes!: QueryList<ElementRef>;

    public categories?: ICategory[];
    public cities?: ICity[];

    public categoryForm: FormGroup;
    public cityForm: FormGroup;
    public conditionForm: FormGroup;
    public purposeForm: FormGroup;

    @Input() selectedCategoryId?: string;

    @Output() categoryChangeEvent = new EventEmitter<FormArray>();
    @Output() cityChangeEvent = new EventEmitter<FormArray>();
    @Output() conditionChangeEvent = new EventEmitter<FormArray>();
    @Output() purposeChangeEvent = new EventEmitter<FormArray>();
    @Output() filterResetEvent = new EventEmitter<void>();

    constructor(
        private categoryService: CategoryService,
        private cityService: CityService,
        private formBuilder: FormBuilder) {
        this.categoryForm = this.formBuilder.group({
            categoryIds: this.formBuilder.array([])
        });
        this.cityForm = this.formBuilder.group({
            cityIds: this.formBuilder.array([])
        });
        this.conditionForm = this.formBuilder.group({
            conditions: this.formBuilder.array([])
        });
        this.purposeForm = this.formBuilder.group({
            purposes: this.formBuilder.array([])
        })

    }

    ngOnInit(): void {
        this.getAllCategories();
        this.getAllCities();
    }

    public getAllCategories(): void {
        this.categoryService.getAll().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.categories = res.data.categories;

                    // check to category 
                    if (this.selectedCategoryId) {
                        this.checkCategoryCheckbox(this.selectedCategoryId);
                        const categoryIds: FormArray = this.categoryForm.get('categoryIds') as FormArray;
                        categoryIds.push(new FormControl(this.selectedCategoryId));
                    }
                }
            },
            error: (e) => {
                console.log(e)
            }
        })

    }

    public getAllCities(): void {
        this.cityService.getAll().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.cities = res.data.cities;
                }
            },
            error: (e) => {
                console.log(e)
            }
        })
    }

    public onCategoryChange(e: any): void {
        const categoryIds: FormArray = this.categoryForm.get('categoryIds') as FormArray

        if (e.target.checked) {
            categoryIds.push(new FormControl(e.target.value));
        } else {
            const index = categoryIds.controls.findIndex(x => x.value === e.target.value);
            categoryIds.removeAt(index)
        }

        this.categoryChangeEvent.emit(categoryIds);
    }

    public onCityChange(e: any): void {
        const cityIds: FormArray = this.cityForm.get('cityIds') as FormArray

        if (e.target.checked) {
            cityIds.push(new FormControl(e.target.value));
        } else {
            const index = cityIds.controls.findIndex(x => x.value === e.target.value);
            cityIds.removeAt(index)
        }

        this.cityChangeEvent.emit(cityIds);
    }

    public onConditionChange(e: any): void {
        const conditions: FormArray = this.conditionForm.get('conditions') as FormArray

        if (e.target.checked) {
            conditions.push(new FormControl(e.target.value));
        } else {
            const index = conditions.controls.findIndex(x => x.value === e.target.value);
            conditions.removeAt(index)
        }

        this.conditionChangeEvent.emit(conditions);
    }

    public onPurposeChange(e: any): void {
        const purposes: FormArray = this.purposeForm.get('purposes') as FormArray

        if (e.target.checked) {
            purposes.push(new FormControl(e.target.value));
        } else {
            const index = purposes.controls.findIndex(x => x.value === e.target.value);
            purposes.removeAt(index)
        }

        this.purposeChangeEvent.emit(purposes);
    }

    public onResetFilter(e: any): void {
        const categoryIds: FormArray = this.categoryForm.get('categoryIds') as FormArray
        const cityIds: FormArray = this.cityForm.get('cityIds') as FormArray
        const conditions: FormArray = this.conditionForm.get('conditions') as FormArray
        const purposes: FormArray = this.purposeForm.get('purposes') as FormArray

        this.removeAllItems(categoryIds);
        this.removeAllItems(cityIds);
        this.removeAllItems(conditions);
        this.removeAllItems(purposes);

        this.uncheckAll();

        this.filterResetEvent.emit();

    }

    // remove all items in form array when reset filter
    public removeAllItems(items: FormArray) {
        while (items.length !== 0) {
            items.removeAt(0);
        }
    }

    // uncheck all checkboxes
    uncheckAll() {
        this.checkboxes.forEach((element) => {
            element.nativeElement.checked = false;
        });
    }

    // toggle filter session
    public toggleFilterNav() {
        const filterNav = document.getElementById('filter');

        if (filterNav?.style.display == 'block') {
            filterNav.style.display = 'none';
        } else {
            filterNav!.style.display = 'block';
        }
    }

    // checked category checkbox
    public checkCategoryCheckbox(categoryId: string) {
        this.categories?.forEach((category) => {
            if (Number(categoryId) == category.id) {
                category!.isChecked = true;
            }
        })
        // this.categoryCheckboxes.forEach((element) => {
        //     if (element.nativeElement.value == categoryId) {
        //         element.nativeElement.checked = false;
        //     }
        // });
    }
}
