import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    SelectModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    DatePickerModule,
    MessageModule,
    CalendarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  contactForm: FormGroup;
  passengersForm!: FormGroup;
  submitted = false;
  passengersSubmitted = false;
  successMessage = '';

  passengerData = [
    { id: '9049c959-cdfd-433c-ad4d-cf86c935745b', type: 'Adult (12+)' },
    { id: '1b41af93-acf7-46c6-81ff-1c75e9a43be4', type: 'Adult (12+)' },
    { id: 'b9d3e22d-4240-4d9b-8909-43122f0cac0f', type: 'Adult (12+)' },
  ];

  codes = [
    { label: '+90', value: '+TR' },
    { label: '+1', value: 'USA' },
    { label: '+44', value: '+UK' },
    { label: '+61', value: '+AS' },
    { label: '+81', value: '+JP' },
  ];

  countries = [
    { label: 'Turkey', value: 'Turkey' },
    { label: 'United States of America', value: 'USA' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Japan', value: 'Japan' },
  ];

  nationalities = [
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'United States', value: 'USA' },
    { label: 'United Kingdom', value: 'UK' },
  ];

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

  initializePassengerForms() {
    const passengerArray = this.passengerData.map(() =>
      this.fb.group({
        gender: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(2)]],
        surname: ['', [Validators.required, Validators.minLength(2)]],
        nationality: ['Netherlands', Validators.required],
        birthDate: ['', Validators.required],
      })
    );

    this.passengersForm = this.fb.group({
      passengers: this.fb.array(passengerArray),
    });
  }

  get passengerForms(): FormArray {
    return this.passengersForm.get('passengers') as FormArray;
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
    if (this.passengersForm.valid) {
      console.log('Passenger data:', this.passengersForm.value);
      this.successMessage = 'Passenger Information Successfully Saved!';

      setTimeout(() => {
        this.initializePassengerForms();
        this.passengersSubmitted = false;
        this.successMessage = '';
      }, 3000);
    } else {
      console.log('Passengers Form is invalid!');
      const passengersArray = this.passengersForm.get(
        'passengers'
      ) as FormArray;
      passengersArray.controls.forEach((control, index) => {
        if (control.invalid) {
          console.log(`Passenger ${index + 1} has errors:`, control.errors);
        }
      });
    }
  }

  onPhoneInput(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }

  hasError(
    formGroup: any,
    controlName: string,
    errorType: string,
    index?: number
  ): boolean {
    try {
      let control: AbstractControl | null;

      if (index !== undefined && this.passengerForms) {
        control = this.passengerForms.at(index).get(controlName);
        return Boolean(
          control?.hasError(errorType) &&
            (control?.touched || this.passengersSubmitted)
        );
      } else if (formGroup === this.contactForm) {
        control = this.contactForm.get(controlName);
        return Boolean(
          control?.hasError(errorType) && (control?.touched || this.submitted)
        );
      }
    } catch (error) {
      console.log('Error in hasError function:', error);
    }

    return false;
  }
  getGenderControl(index: number): FormControl {
    return (this.passengersForm.get('passengers') as FormArray)
      .at(index)
      .get('gender') as FormControl;
  }
}
