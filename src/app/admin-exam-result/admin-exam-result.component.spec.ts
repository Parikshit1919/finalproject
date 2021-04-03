import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamResultComponent } from './admin-exam-result.component';

describe('AdminExamResultComponent', () => {
  let component: AdminExamResultComponent;
  let fixture: ComponentFixture<AdminExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExamResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
