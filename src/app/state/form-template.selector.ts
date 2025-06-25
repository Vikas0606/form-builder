import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormTemplateState } from './form-template.reducer';


export const selectFormTemplateState = createFeatureSelector<FormTemplateState>('formTemplates');

export const selectTemplates = createSelector(
  selectFormTemplateState,
  (state: FormTemplateState) => state.templates
);
