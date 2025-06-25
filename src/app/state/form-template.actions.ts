import { createAction, props } from '@ngrx/store';
import { FormTemplate } from './form-template.models';

export const saveTemplate = createAction(
  '[Form] Save Template',
  props<{ template: FormTemplate }>()
);

export const loadTemplates = createAction('[Form] Load Templates');

export const loadTemplatesSuccess = createAction(
  '[Form] Load Templates Success',
  props<{ templates: FormTemplate[] }>()
);
