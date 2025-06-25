import { createReducer, on, State } from "@ngrx/store";
import { FormTemplate } from "./form-template.models";
import * as FormTemplateAction from "./form-template.actions";



export interface FormTemplateState {
  templates: FormTemplate[];
}

const IntialState: FormTemplateState =
{
  templates: []
}

export const formTemplateReducer = createReducer(
  IntialState,
  on(FormTemplateAction.saveTemplate, (state, { template }) => ({
    ...state,
    templates: [...state.templates, template]
  })),
  on(FormTemplateAction.loadTemplatesSuccess, (state, { templates }) => ({
    ...state,
    templates
  }))
)