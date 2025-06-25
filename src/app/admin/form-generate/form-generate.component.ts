import { Component, Inject, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { loadTemplatesSuccess, saveTemplate } from '../../state/form-template.actions';
import { MatDividerModule } from '@angular/material/divider';
import { selectTemplates } from '../../state/form-template.selector';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-generate',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './form-generate.component.html',
  styleUrls: ['./form-generate.component.scss']
})
export class FormGenerateComponent implements OnInit {
  inputTemplates: any[] = [];
  previewFields: any[] = [];
  editingFieldId: number | null = null;
  newOptionMap: { [fieldId: string]: string } = {};
  templates$: any = this.store.select(selectTemplates);
  constructor(private store: Store,private router: Router) { }

  ngOnInit() {
    const localTemplates = JSON.parse(localStorage.getItem('formTemplates') || '[]');
    this.store.dispatch(loadTemplatesSuccess({ templates: localTemplates }));
  }


  inputFields = [
    { label: 'Text Input', type: 'text' },
    { label: 'Textarea', type: 'textarea' },
    { label: 'Date Picker', type: 'date' },
    { label: 'Dropdown', type: 'select' },
    { label: 'Radio Button', type: 'radio' },
    { label: 'Checkbox Group', type: 'checkbox' }
  ];

  textInputTemplates = [
    { label: 'Standard Input', type: 'text', placeholder: 'Enter text', id: '', helpText: '', validators: [], errorText: '' },
    { label: 'Password Input', type: 'password', placeholder: 'Enter password', id: '', helpText: '', validators: [], errorText: '' },
    { label: 'Search Input', type: 'search', placeholder: 'Search...', id: '', helpText: '', validators: [], errorText: '' }
  ];

  textareaTemplates = [
    { label: 'Multiline Textarea', type: 'textarea', placeholder: 'Enter text', id: '', helpText: '', validators: [], errorText: '' }
  ];

  datePickerTemplates = [
    { label: 'Date Picker', type: 'date', placeholder: 'Select date', id: '', helpText: '', validators: [], errorText: '' }
  ];

  dropdownTemplates = [
    { label: 'Dropdown', type: 'select', placeholder: 'Choose option', id: '', helpText: '', validators: [], errorText: '', options: ['Option 1', 'Option 2'] }
  ];

  radioTemplates = [
    { label: 'Radio Group', type: 'radio', placeholder: '', id: '', helpText: '', validators: [], errorText: '', options: ['Option A', 'Option B'] }
  ];

  checkBoxTemplates = [
    { label: 'Checkbox Group', type: 'checkbox', placeholder: '', id: '', helpText: '', validators: [], errorText: '', options: ['Option X', 'Option Y'] }
  ];

  onInputFieldClick(type: string) {
    const templates: any = {
      text: this.textInputTemplates,
      textarea: this.textareaTemplates,
      date: this.datePickerTemplates,
      select: this.dropdownTemplates,
      radio: this.radioTemplates,
      checkbox: this.checkBoxTemplates
    };
    this.inputTemplates = [...(templates[type] || [])];
  }

  onDragStart(event: DragEvent, input: any) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(input));
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const fieldData = event.dataTransfer?.getData('text/plain');
    if (fieldData) {
      const field = JSON.parse(fieldData);
      const newField = { ...field, id: Date.now() };
      this.previewFields.push(newField);
      this.onInputFieldClick(field.type);
    }
  }

  toggleConfig(fieldId: number) {
    this.editingFieldId = this.editingFieldId === fieldId ? null : fieldId;
  }

  closeConfig() {
    this.editingFieldId = null;
  }

  onInputChange(event: Event, fieldId: number, key: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const field = this.previewFields.find(f => f.id === fieldId);
    if (field) field[key] = value;
  }

  updateField(fieldId: number, key: string, value: any) {
    const field = this.previewFields.find(f => f.id === fieldId);
    if (field) field[key] = value;
  }

  onNewOptionInput(event: Event, fieldId: number) {
    const input = event.target as HTMLInputElement;
    this.newOptionMap[fieldId] = input.value;
  }

  addOption(fieldId: number) {
    const newOption = this.newOptionMap[fieldId]?.trim();
    if (!newOption) return;
    const field = this.previewFields.find(f => f.id === fieldId);
    if (field && Array.isArray(field.options)) {
      field.options.push(newOption);
      this.newOptionMap[fieldId] = '';
    }
  }

  onOptionEdit(event: Event, fieldId: number, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const field = this.previewFields.find(f => f.id === fieldId);
    if (field?.options && field.options[index] !== undefined) {
      field.options[index] = value;
    }
  }

  removeOption(fieldId: number, index: number) {
    const field = this.previewFields.find(f => f.id === fieldId);
    if (field?.options) {
      field.options = field.options.filter((_: any, i: number) => i !== index);
    }
  }

  saveTemplate(formName: string) {
    const newTemplate = {
      id: Date.now(),
      name: formName,
      fields: this.previewFields
    };

    const saved: any[] = JSON.parse(localStorage.getItem('formTemplates') || '[]');
    const existingIndex = saved.findIndex(t => t.name.toLowerCase() === formName.toLowerCase());
    if (existingIndex !== -1) {
      saved[existingIndex] = { ...saved[existingIndex], fields: this.previewFields };
    } else {
      saved.push(newTemplate);
      this.store.dispatch(saveTemplate({ template: newTemplate }));
    }

    localStorage.setItem('formTemplates', JSON.stringify(saved));
  }


  loadTemplate(template: any) {
    this.previewFields = template.fields.map((f: any) => ({ ...f }));
  }

  promptAndSaveTemplate() {
    const formName = window.prompt('Enter a name for the form template');
    if (formName && formName.trim()) {
      this.saveTemplate(formName.trim());
    }
  }
  logout() {
    this.router.navigate(['']);
  }

  deleteField(id:any){
    let index = this.previewFields.findIndex((field) => field.id === id);
    if (index !== -1) {
      this.previewFields.splice(index, 1);
    }
  }

}




