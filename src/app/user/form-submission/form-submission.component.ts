import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-form-submission',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent {
  templates: any[] = [];
  selectedForm: any = null;
  form!: FormGroup;
  submittedData: any = null;
  initialFormValue: any;

  constructor(private fb: FormBuilder) {
    const saved = localStorage.getItem('formTemplates');
    this.templates = saved ? JSON.parse(saved) : [];
  }

  loadForm(template: any) {
    this.selectedForm = template;
    const controls: { [key: string]: any } = {};

    // Convert field IDs to string for each control name.
    for (const field of template.fields) {
      const id = field.id.toString();
      const validators = field.required ? [Validators.required] : [];
      controls[id] = field.type === 'checkbox'
        ? new FormControl([], validators)
        : new FormControl('', validators);
    }
    this.form = this.fb.group(controls);
    this.initialFormValue = this.form.value;
  }

  onCheckboxChange(field: any, option: string, event: any) {
    const control = this.form.get(field.id.toString());
    let selectedOptions: string[] = control?.value || [];
    if (event.checked) {
      if (!selectedOptions.includes(option)) {
        selectedOptions.push(option);
      }
    } else {
      selectedOptions = selectedOptions.filter(o => o !== option);
    }
    control?.setValue(selectedOptions);
  }

  isChecked(field: any, option: string): boolean {
    const control = this.form.get(field.id.toString());
    const selectedOptions: string[] = control?.value || [];
    return selectedOptions.includes(option);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submittedData = this.form.value;
    this.form.reset(this.initialFormValue);
    window.alert('Form submitted successfully!');
  }
}

