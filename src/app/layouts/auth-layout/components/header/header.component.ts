import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isHeaderHide: boolean = false;
    lastScrollTop = 0;
    constructor() { }

    ngOnInit(): void {
    }

    @HostListener('window:scroll', ['$event']) onScroll(): void {
        const doc = document.documentElement;
        const w = window;
        const srcollTop = w.pageYOffset || doc.scrollTop;

        if (srcollTop > this.lastScrollTop) {
            this.isHeaderHide = true;
        } else {
            this.isHeaderHide = false;
        }
        this.lastScrollTop = srcollTop;
    }
}
