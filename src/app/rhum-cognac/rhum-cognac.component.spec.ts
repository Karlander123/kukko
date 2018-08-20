import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhumCognacComponent } from './rhum-cognac.component';

describe('RhumCognacComponent', () => {
  let component: RhumCognacComponent;
  let fixture: ComponentFixture<RhumCognacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhumCognacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhumCognacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
