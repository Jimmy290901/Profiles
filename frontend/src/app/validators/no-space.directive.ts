import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoSpace]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: NoSpaceDirective, multi: true}
  ]
})
export class NoSpaceDirective implements Validator {

  constructor() { }

  validate(field: FormControl) : ValidationErrors | null {
    return NoSpaceValidator(field);
  }

}

export function NoSpaceValidator(field: AbstractControl) : ValidationErrors | null {
  const fieldValue = field.value;
  if (fieldValue === null) {
    return null;
  }
  if (fieldValue.indexOf(' ') === -1) {
    return null;
  }
  return {'hasSpace': true};
}