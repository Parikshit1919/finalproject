import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamSelectComponent } from './student-exam-select.component';

describe('StudentExamSelectComponent', () => {
  let component: StudentExamSelectComponent;
  let fixture: ComponentFixture<StudentExamSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
