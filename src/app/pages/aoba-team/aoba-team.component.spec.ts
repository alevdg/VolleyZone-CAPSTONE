import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AobaTeamComponent } from './aoba-team.component';

describe('AobaTeamComponent', () => {
  let component: AobaTeamComponent;
  let fixture: ComponentFixture<AobaTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AobaTeamComponent]
    });
    fixture = TestBed.createComponent(AobaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
