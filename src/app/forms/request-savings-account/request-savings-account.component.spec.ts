import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSavingsAccountComponent } from './request-savings-account.component';

describe('RequestSavingsAccountComponent', () => {
  let component: RequestSavingsAccountComponent;
  let fixture: ComponentFixture<RequestSavingsAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSavingsAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
