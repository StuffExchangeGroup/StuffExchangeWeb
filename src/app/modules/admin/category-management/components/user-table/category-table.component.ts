import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICategory } from '../../models/ICategory';
// import { IListUserReponse } from '../../models/IUser';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
  @Input() ListCategory?: ICategory[];
  @Input() set showLoadingCategories(value: boolean) {
    value ? this.spinner.show() : ''
    this._showLoadingCategory = value;
  }

  @Output() editUserEvent = new EventEmitter<string>();
  @Output() deleteUserEvent = new EventEmitter<string>();

  public _showLoadingCategory!: boolean; 

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  public editUser(category: ICategory): void { 
    // this.editUserEvent.emit(category.id)
  }

  public deleteUser(category: ICategory): void { 
    // this.deleteUserEvent.emit(user.id)
  }
}
