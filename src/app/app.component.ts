import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  contactForm: FormGroup;
  submitted = false;

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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
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
    });
  }

  successMessage = '';

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form values:', this.contactForm.value);
      this.successMessage = 'İşlem Başarıyla Yapıldı!';
      this.contactForm.reset();
      this.submitted = false;

      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    } else {
      console.log('Form is invalid!');
    }
  }
}
