import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

export function salaryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isPositive = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value);

    return !isPositive ? { positiveValue: true } : null;
  };
}
export function dateValidator() {}
// export function dateValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     console.log(control);
//     const value = control.value;
//     if (control.value) {
//       const date = moment(control.value);
//       const today = moment();
//       if (date.isBefore(today)) {
//         return { invalidDate: true };
//       }
//     }
//     return null;
//   };
// }
