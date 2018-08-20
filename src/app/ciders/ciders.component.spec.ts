import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidersComponent } from './ciders.component';

describe('CidersComponent', () => {
  let component: CidersComponent;
  let fixture: ComponentFixture<CidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
