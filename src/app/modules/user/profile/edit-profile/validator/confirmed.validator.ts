import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ConfirmedValidator {
    static passwordMatch(password: string, confirmPassword: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const passwordControl = formGroup.get(password);
            const confirmPasswordControl = formGroup.get(confirmPassword);

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (
                confirmPasswordControl.errors &&
                !confirmPasswordControl.errors?.['mismatch']
            ) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ mismatch: true });
                return { mismatch: true };
            } else {
                confirmPasswordControl.setErrors(null);
                return null;
            }
        };
    }
}