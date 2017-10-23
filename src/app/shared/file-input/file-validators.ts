import { FileInput } from './file-input.model';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class FileValidators {

    /**
     * Function to control content of files
     *
     * @param control
     *
     * @returns
     */
    static maxContentSize(bytes: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const size = control && control.value ? (control.value as FileInput).files.map(f => f.size).reduce((acc, i) => acc + i, 0) : 0;
            const condition = bytes > size;
            return condition ? null : {
                maxContentSize: {
                    actualSize: size,
                    maxSize: bytes
                }
            };
        }
    }

    static fileType(type: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const file = control && control.value ? (control.value as FileInput).files : [];
            let hasError = false;
            file.forEach(f => {
                if (f.type != type) {
                   hasError = true;
                   return;
                }
            });
            return hasError ? { fileType: {message : 'Invalid File'}} : null;
        }
    }
}