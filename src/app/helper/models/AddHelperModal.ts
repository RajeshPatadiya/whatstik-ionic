import { formatDate } from "@angular/common";
import { FileUploadService } from "../services/file-upload.service";

export interface ImageType {

    url: any;
    file: File;
    progress: number;
}
export abstract class AddHelperMethods {

    dateChange(value: Date, dtObj: Object, dataKey: string): void {
        if (value !== null) {
            value.setHours(0, 0, 0, 0);
            dtObj[dataKey] = AddHelperMethods.enDateFormat(value);
        }
    }
    loadCasts(cast: string): Array<Object> {
        if (!cast) {
            return [];
        }
        return cast.split(",").map(c => {
            return { display: c, value: c };
        })
    }
    getCasts(cast: Array<Object>): string {
        return cast.map(c => {
            return c['value'];
        }).join(",");
    }

    addImage(file: any, image: ImageType, errObj: Object) {
        errObj['error'] = "";
        if (file.target.files.item(0).type.match(/image\/*/) == null) {
            errObj['error'] = "Only images are allowed for uploading graphic.";
            return;
        }
        image.file = <File>file.target.files[0];
        this.previewImage(image);
    }

    async uploadImage(image: ImageType, old_filename: string, fileUploadServ: FileUploadService, errObj: Object) {
        if (image.file === null) {
            return;
        }
        const formData = new FormData();
        formData.append("Image", image.file, image.file.name);
        formData.append("OldFilename", old_filename);

        await fileUploadServ.uploadFile(formData, image).catch(
            error => {
                errObj['error'] = error;
            }
        );
    }

    static getOldFileName(value): string {
        if (value === '' || value === null || value === undefined) {
            return '';
        }
        value = value.split('?')[0];
        value = value.substr(value.search(/\/[0-9]/) + 1);
        return value;
    }

    previewImage(image: ImageType): any {
        var mimeType = image.file.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(image.file);
        reader.onload = _event => {
            image.url = reader.result;
        };
    }

    static enDateFormat(value) {
        if (value !== null && value !== undefined && value !== '')
            return formatDate(value, 'yyyy-MM-dd', 'en');
        else
            return '';
    }

    IsTimeValid(event: boolean, obj: Object) {
        // this.TimeValid = event;
        obj['error'] = !event ? "Please enter valid time" : '';
    }

}
