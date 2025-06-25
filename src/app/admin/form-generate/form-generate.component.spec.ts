import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { FormGenerateComponent } from './form-generate.component';

describe('FormGenerateComponent', () => {
  let component: FormGenerateComponent;
  let fixture: ComponentFixture<FormGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormGenerateComponent,
        NoopAnimationsModule
      ],
      providers: [provideMockStore({ initialState: {} })]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
