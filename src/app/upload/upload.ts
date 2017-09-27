export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: string;
    uploaderUID: string;
    uploaderName: string;

    constructor(file: File) {
        this.file = file;
    }
}
