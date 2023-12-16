import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogeBitaComponent } from './escoge-bita.component';

describe('EscogeBitaComponent', () => {
  let component: EscogeBitaComponent;
  let fixture: ComponentFixture<EscogeBitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscogeBitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscogeBitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
