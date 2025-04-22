import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isParticipating: boolean = false;
  submitted = false;
  selectedCode: string = '';
  selectedCountry: string = '';

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

  onSubmit(form: any) {
    this.submitted = true;

    if (
      form.valid &&
      this.selectedCode &&
      this.selectedCountry &&
      this.isParticipating !== null &&
      this.isValidEmail(form.value.email) &&
      this.isValidEmail(form.value.repeatemail) &&
      form.value.email === form.value.repeatemail
    ) {
      console.log(
        'Form is valid and submitted!',
        form.value,
        this.isParticipating
      );
    } else {
      console.log('Form is invalid!');
    }
  }
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
