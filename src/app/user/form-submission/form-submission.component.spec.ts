import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSubmissionComponent } from './form-submission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormSubmissionComponent', () => {
  let component: FormSubmissionComponent;
  let fixture: ComponentFixture<FormSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubmissionComponent, ReactiveFormsModule, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load form and create controls for template fields', () => {
    const template = {
      name: 'Test Form',
      fields: [
        { id: 1, label: 'Text Field', type: 'text', placeholder: 'Enter text', required: true },
        { id: 2, label: 'Checkbox Field', type: 'checkbox', options: ['Option1', 'Option2'], required: false }
      ]
    };

    component.loadForm(template);
    expect(component.selectedForm).toEqual(template);
    expect(component.form.contains('1')).toBeTrue();
    expect(component.form.contains('2')).toBeTrue();
    expect(component.form.get('1')?.value).toEqual('');
    expect(component.form.get('2')?.value).toEqual([]);
  });

  it('should toggle checkbox values correctly', () => {
    const template = {
      name: 'Test Form',
      fields: [
        { id: 3, label: 'Checkbox Field', type: 'checkbox', options: ['Option1', 'Option2'], required: false }
      ]
    };

    component.loadForm(template);
    const field = template.fields[0];
    const control = component.form.get(field.id.toString());
    expect(control?.value).toEqual([]);

    const eventChecked = { checked: true };
    component.onCheckboxChange(field, 'Option1', eventChecked);
    expect(control?.value).toEqual(['Option1']);

    component.onCheckboxChange(field, 'Option2', eventChecked);
    expect(control?.value).toEqual(['Option1', 'Option2']);

    const eventUnchecked = { checked: false };
    component.onCheckboxChange(field, 'Option1', eventUnchecked);
    expect(control?.value).toEqual(['Option2']);
  });

  it('should submit valid form data', () => {
    const template = {
      name: 'Test Form',
      fields: [
        { id: 4, label: 'Text Field', type: 'text', placeholder: 'Enter text', required: true },
        { id: 5, label: 'Radio Field', type: 'radio', options: ['Yes', 'No'], required: true }
      ]
    };

    component.loadForm(template);
    component.form.get('4')?.setValue('Test Value');
    component.form.get('5')?.setValue('Yes');

    component.onSubmit();
    expect(component.submittedData).toEqual({ '4': 'Test Value', '5': 'Yes' });
  });

  it('should mark all controls as touched when submitting an invalid form', () => {
    const template = {
      name: 'Test Form',
      fields: [
        { id: 6, label: 'Required Field', type: 'text', placeholder: 'Enter something', required: true }
      ]
    };

    component.loadForm(template);
    spyOn(component.form, 'markAllAsTouched');
    component.onSubmit();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });
});
