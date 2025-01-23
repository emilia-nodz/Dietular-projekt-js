import { AbstractControl, ValidationErrors } from "@angular/forms";

export function positiveNumbersValidator(ctrl:AbstractControl): ValidationErrors | null {
  const value=ctrl.value;
  const isPositive = typeof value === 'number' && value > 0;
  console.log("control value:", value, "isPositive:", isPositive);
  
  return isPositive ? null : { positiveNumberValidator: true };
}