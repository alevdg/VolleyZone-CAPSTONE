import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekomaTeamComponent } from './nekoma-team.component';

describe('NekomaTeamComponent', () => {
  let component: NekomaTeamComponent;
  let fixture: ComponentFixture<NekomaTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NekomaTeamComponent]
    });
    fixture = TestBed.createComponent(NekomaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
