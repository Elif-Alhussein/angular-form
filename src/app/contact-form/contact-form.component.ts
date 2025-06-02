import { Component, Input } from '@angular/core';
import {
  FormGroup,ReactiveFormsModule
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() submitted: boolean = false;

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

  onPhoneInput(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }
}
