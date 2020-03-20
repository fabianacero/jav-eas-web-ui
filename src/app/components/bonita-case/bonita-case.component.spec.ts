import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonitaCaseComponent } from './bonita-case.component';

describe('BonitaCaseComponent', () => {
  let component: BonitaCaseComponent;
  let fixture: ComponentFixture<BonitaCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonitaCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonitaCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
