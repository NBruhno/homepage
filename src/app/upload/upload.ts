export class UpTemp {
    file: File;
    name: string;
    progress: number;
    fileID: string;

    constructor(file: File, filedID: string) {
        this.file = file;
        this.fileID = filedID;
    }
}
