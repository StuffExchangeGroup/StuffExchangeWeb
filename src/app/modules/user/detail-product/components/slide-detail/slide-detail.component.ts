import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-slide-detail',
    templateUrl: './slide-detail.component.html',
    styleUrls: ['./slide-detail.component.scss'],
})
export class SlideDetailComponent implements OnInit {
    public productImages_: string[] = [];
    public thumbnail?: string;
    public currentIndex: number = 0;
    @Input() set productImages(value: string[]) {
        if (value != []) {
            this.productImages_ = value;
            this.thumbnail = value[this.currentIndex]
        }
    }
    constructor() {
    }

    ngOnInit(): void {
    }

    changeThumbnail(i: number): void {
        this.imageActive(this.currentIndex, i);
        this.currentIndex = i;
        this.thumbnail = this.productImages_[this.currentIndex];
    }

    nextThumbnail(): void {
        const element = document.getElementById("images");

        if (this.currentIndex < this.productImages_.length - 1) {
            this.imageActive(this.currentIndex, ++this.currentIndex);
            this.thumbnail = this.productImages_[this.currentIndex];
            element!.scrollLeft = element?.scrollLeft! + 50;
        }
        else {
            this.imageActive(this.currentIndex, 0);
            this.currentIndex = 0;
            this.thumbnail = this.productImages_[this.currentIndex];
            element!.scrollLeft = -100;
        }
    }

    previousThumbnail(): void {
        const element = document.getElementById("images");

        if (this.currentIndex > 0) {
            this.imageActive(this.currentIndex, --this.currentIndex);
            this.thumbnail = this.productImages_[this.currentIndex];
            element!.scrollLeft = element?.scrollLeft! - 50;
        }
        else {
            this.imageActive(this.currentIndex, this.productImages_.length - 1);
            this.currentIndex = this.productImages_.length - 1;
            this.thumbnail = this.productImages_[this.currentIndex];
            element!.scrollLeft = 100;
        }
    }

    imageActive(unActiveId: number, activeId: number) {
        const unActiveImage = document.getElementById(unActiveId.toString());
        const activeImage = document.getElementById(activeId.toString());

        unActiveImage?.classList.remove('active');
        activeImage?.classList.add('active');
    }

}
