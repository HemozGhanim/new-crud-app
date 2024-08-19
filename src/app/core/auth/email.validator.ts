import { ValidatorFn } from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
  const EmailregExp = new RegExp(
    /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/
  );
  return (control) => {
    return control.value === '' || EmailregExp.test(control.value)
      ? null
      : { invalidEmail: true };
  };
}
