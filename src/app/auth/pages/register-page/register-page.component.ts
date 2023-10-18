import { ValidatorsService } from './../../../shared/service/validators.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';

import { EmailValidator } from './../../../shared/validators/email-validator.service';

@Component({

  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.ValidatorsService.firstNameAndLastnamePattern )  ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern( this.ValidatorsService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.ValidatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.ValidatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });


  constructor(
    private fb: FormBuilder,
    private ValidatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isValidField( field: string ) {
    return this.ValidatorsService.isValidField( this.myForm, field );
  }

  getFieldError( label: string,  field: string ): string | null {
    return this.ValidatorsService.getFieldError(this.myForm, label,field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
