import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }
  public personNew = this.person


  constructor(
    private fb: FormBuilder,
    private ValidatorsService: ValidatorsService,
  ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  isValidField( field: string ): boolean | null {
    return this.ValidatorsService.isValidField( this.myForm, field );
  }

  //ngSubmit
  onSave() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }


    console.log(this.myForm.value);
    console.log(this.person);

    this.myForm.reset( this.personNew );

  }

}
