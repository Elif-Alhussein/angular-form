import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DatePickerModule,
  ],
  templateUrl: './passenger-form.component.html',
})
export class PassengerFormComponent {
  @Input() passengerForm!: AbstractControl;
  @Input() index!: number;
  @Input() submitted: boolean = false;

  passengerData = [
    { id: '9049c959-cdfd-433c-ad4d-cf86c935745b', type: 'Adult (12+)' },
    { id: '1b41af93-acf7-46c6-81ff-1c75e9a43be4', type: 'Adult (12+)' },
    { id: 'b9d3e22d-4240-4d9b-8909-43122f0cac0f', type: 'Adult (12+)' },
  ];
  nationalities = [
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'United States', value: 'USA' },
    { label: 'United Kingdom', value: 'UK' },
  ];
  get formGroup(): FormGroup {
    return this.passengerForm as FormGroup;
  }

  get passengerType(): string {
    return this.passengerData[this.index]?.type || 'Passenger';
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formGroup.get(controlName);
    return (
      !!control?.hasError(errorType) && (control?.touched || this.submitted)
    );
  }

  getGenderControl(): FormControl {
    return this.formGroup.get('gender') as FormControl;
  }
}
