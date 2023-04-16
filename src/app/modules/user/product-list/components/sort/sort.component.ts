import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

    @Input() numberOfProduct!: number | undefined;
    @Output() sortChangeEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    public onClick(event: any) {
        const id = event.target.attributes.id;
        const btnActives = document.getElementsByClassName('active');
        const btnSelect = document.getElementById(id.value);

        while (btnActives.length) {
            btnActives[0].classList.remove('active');
        }

        if (btnSelect != null) {
            btnSelect.classList.add('active');
        }

        this.sortChangeEvent.emit(event.target.value)
    }

    // reset sort session when reset filter
    public resetSort(): void {
        const popularBtn = document.getElementById('btn-popular');
        if (popularBtn?.classList.contains('active')) {
            return;
        }
        else {
            popularBtn?.classList.add('active')
            const newestBtn = document.getElementById('btn-newest');
            const favoriteBtn = document.getElementById('btn-favorite');
            newestBtn?.classList.remove('active');
            favoriteBtn?.classList.remove('active');
        }
    }
}
