import { FileInput } from './file-input.model';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppLabels } from "../../app-config";

export class FileValidators {

    /**
     * Function to control content of files
     *
     * @param control
     *
     * @returns
     * 
     */

    static transformByte(value: any, args?: any): any {
        if (!!value) {
            value = this.formatBytes(+value, +args);
        }
        return value;
    }

    static formatBytes(bytes: number, decimals?: number) {
        let unit = 'Byte';
        if (bytes === 0) { return '0 ' + unit };
        const B = unit.charAt(0);
        const k = 1024,
            dm = decimals || 2,
            sizes = [unit, 'K' + B, 'M' + B, 'G' + B, 'T' + B, 'P' + B, 'E' + B, 'Z' + B, 'Y' + B],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static maxContentSize(bytes: number): ValidatorFn {
        let label = AppLabels.makeClaim.warningForFileSize;
        return (control: AbstractControl): { [key: string]: any } => {
            const size = control && control.value ? (control.value as FileInput).files.map(f => f.size).reduce((acc, i) => acc + i, 0) : 0;
            const condition = bytes > size;
            return condition ? null : {
                maxContentSize: {
                    errormessage: label.replace('X', this.transformByte(bytes).toString()).replace('Y', this.transformByte(size).toString())
                }
            };
        }
    }

    static fileType(formats: Array<string>): ValidatorFn {
        let label = AppLabels.makeClaim.warningForInvalidFile;
        return (control: AbstractControl): { [key: string]: any } => {
            const file = control && control.value ? (control.value as FileInput).files : [];
            let hasError = false;
            file.forEach(f => {
                let fileFormat = f.name.split('.').pop();
                if (!formats.includes(fileFormat)) {
                    hasError = true;
                    return;
                }
            });
            return hasError ? { fileType: { errormessage: label.replace('X', formats.toString()) } } : null;
        }
    }
}