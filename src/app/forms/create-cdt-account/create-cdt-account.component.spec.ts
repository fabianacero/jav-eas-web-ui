import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCdtAccountComponent } from './create-cdt-account.component';

describe('CreateCdtAccountComponent', () => {
  let component: CreateCdtAccountComponent;
  let fixture: ComponentFixture<CreateCdtAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCdtAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCdtAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
