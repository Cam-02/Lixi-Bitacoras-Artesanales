import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenabitComponent } from './disenabit.component';

describe('DisenabitComponent', () => {
  let component: DisenabitComponent;
  let fixture: ComponentFixture<DisenabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisenabitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisenabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
