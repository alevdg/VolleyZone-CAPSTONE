import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegisterComponent } from './log-register.component';

describe('LogRegisterComponent', () => {
  let component: LogRegisterComponent;
  let fixture: ComponentFixture<LogRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogRegisterComponent]
    });
    fixture = TestBed.createComponent(LogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
