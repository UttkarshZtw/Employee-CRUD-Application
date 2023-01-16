import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function salaryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isPositive = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value);

    return !isPositive ? { positiveValue: true } : null;
  };
}
export function dateValidator() {}
