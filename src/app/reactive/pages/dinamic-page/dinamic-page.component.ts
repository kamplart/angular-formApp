import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-dinamic-page',
  templateUrl: './dinamic-page.component.html',
  styles: [
  ]
})
export class DinamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // });


  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor(
    private fb: FormBuilder,
    private ValidatorsService: ValidatorsService
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField( field: string ): boolean | null {
    return this.ValidatorsService.isValidField( this.myForm, field );
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }


  getFieldError( label:string,  field: string ): string | null {
    return this.ValidatorsService.getFieldError(this.myForm, label,field);
  }

  onAddToFavorites():void {

    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(  new FormControl( newGame, Validators.required ) );
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();

  }


  onDeleteFavorite( index:number ):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();

  }
}
