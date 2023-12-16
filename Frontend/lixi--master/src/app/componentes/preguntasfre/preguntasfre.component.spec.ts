import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasfreComponent } from './preguntasfre.component';

describe('PreguntasfreComponent', () => {
  let component: PreguntasfreComponent;
  let fixture: ComponentFixture<PreguntasfreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntasfreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntasfreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
