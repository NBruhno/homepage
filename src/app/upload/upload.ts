export class Upload {

    day: string = new Date().getDate().toString();
    month: string = new Date().getMonth().toString();
    year: string = new Date().getFullYear().toString();
    $key: string;
    file: File;
    name: string;
    displayName: string;
    url: string;
    progress: number;
    createdAt: string;
    uploader: string;

    constructor(file: File) {
        this.file = file;
    }
}
