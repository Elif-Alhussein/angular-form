import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PassengerFormComponent } from './passenger-form/passenger-form.component';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ContactFormComponent,
    PassengerFormComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  contactForm: FormGroup;
  passengerForm!: FormGroup;
  submitted = false;
  successMessage = '';
  passengersSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        repeatemail: ['', [Validators.required, Validators.email]],
        code: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        zipcode: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z0-9\\s-]{3,10}$')],
        ],
        isParticipating: [false, Validators.requiredTrue],
      },
      { validators: this.emailMatchValidator }
    );
    this.initializePassengerForms();
  }

  emailMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const email = control.get('email');
    const repeatemail = control.get('repeatemail');

    if (email && repeatemail && email.value !== repeatemail.value) {
      return { emailMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      console.log('Contact Form data to be submitted:', this.contactForm.value);
      this.successMessage = 'Contact Information Successfully Saved!';

      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.successMessage = '';
      }, 3000);
    } else {
      console.log('Contact Form is invalid!', this.contactForm.errors);
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        if (control && control.invalid) {
          console.log(`${key} control has errors:`, control.errors);
        }
      });
    }
  }

  onSubmitPassengers() {
    this.passengersSubmitted = true;
    if (this.passengerForm.valid) {
      console.log('Passenger data:', this.passengerForm.value);
      this.successMessage = 'Passenger Information Successfully Saved!';

      setTimeout(() => {
        this.initializePassengerForms();
        this.passengersSubmitted = false;
        this.successMessage = '';
      }, 3000);
    } else {
      console.log('Passengers Form is invalid!');
      const passengersArray = this.passengerForm.get('passengers') as FormArray;
      passengersArray.controls.forEach((control, index) => {
        if (control.invalid) {
          console.log(`Passenger ${index + 1} has errors:`, control.errors);
        }
      });
    }
  }

  hasError(
    formGroup: any,
    controlName: string,
    errorType: string,
    index?: number
  ): boolean {
    try {
      let control: AbstractControl | null;
      if (formGroup === this.contactForm) {
        control = this.contactForm.get(controlName);
        return Boolean(
          control?.hasError(errorType) && (control?.touched || this.submitted)
        );
      } else if (index !== undefined && this.passengerForms) {
        control = this.passengerForms.at(index).get(controlName);
        return Boolean(
          control?.hasError(errorType) &&
            (control?.touched || this.passengersSubmitted)
        );
      }
    } catch (error) {
      console.log('Error in hasError function:', error);
    }

    return false;
  }

  getGenderControl(index: number): FormControl {
    return (this.passengerForm.get('passengers') as FormArray)
      .at(index)
      .get('gender') as FormControl;
  }

initializePassengerForms() {
  const passengerCount = 3; 
  const passengerArray = Array(passengerCount).fill(null).map(() =>
    this.fb.group({
      gender: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      nationality: ['Netherlands', Validators.required],
      birthDate: ['', Validators.required],
    })
  );

  this.passengerForm = this.fb.group({
    passengers: this.fb.array(passengerArray),
  });
}

  get passengerForms(): FormArray {
    return this.passengerForm.get('passengers') as FormArray;
  }
  getPassengerFormGroup(index: number): FormGroup {
    return this.passengerForms.at(index) as FormGroup;
  }
}
