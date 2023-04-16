import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class CustomToastrService {

    constructor(private toastrService: ToastrService) {
    }

    public options: Partial<IndividualConfig> = {
        timeOut: 2000,
        closeButton: true,
        progressBar: false
    };

    success(title: string, message: string) {
        this.toastrService.success(message, title, this.options);
    }

    error(title: string, message: string) {
        this.toastrService.error(message, title, this.options);
    }

    info(title: string, message: string) {
        this.toastrService.info(message, title, this.options);
    }
}
