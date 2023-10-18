import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }


  public getFieldError(  form: FormGroup, label: string,  field: string ): string | null {

    const debug:boolean = !true;

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {

      //return (debug?key:'')+' '+label;

      switch( `${label}|${key}` ) {
        case 'nombreApellido|required':
          return `Debe de ser en formato de nombre y apellido. `+(debug?key:'');
        case 'Email|pattern':
          return `email no valido. `+(debug?key:'');
        case 'Username|noStrider':
          return `El username no puede ser Strider. `+(debug?key:'');
        case 'Password|minlength':
          return `La contraseña debe de ser mayor de ${ errors['minlength'].requiredLength }  caracteres. `+(debug?key:'');;
        case 'Confirmar|notEqual':
          return `Las contraseñas deben de ser iguales. `+(debug?key:'');
      }

      switch( key ) {
        case 'required':
          return `\nEl campo '${label}' es requerido. `+(debug?key:'');
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters. `+(debug?key:'');
        case 'min':
          return `El campo '${label}' debe de ser 0 o mayor. `+(debug?key:'');
      }
    }

    return null;
  }


  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }


}
