import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCdtAccountComponent } from './request-cdt-account.component';

describe('RequestCdtAccountComponent', () => {
  let component: RequestCdtAccountComponent;
  let fixture: ComponentFixture<RequestCdtAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCdtAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCdtAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
