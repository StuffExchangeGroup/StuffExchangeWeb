export interface IImageFile {
    file: File;
    name: string;
}

export class ImageFile implements IImageFile {
    file!: File;
    name!: string;

    constructor(file: File, name: string) {
        this.file = file;
        this.name = name;
    }
}