import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnprincipalesComponent } from './btnprincipales.component';

describe('BtnprincipalesComponent', () => {
  let component: BtnprincipalesComponent;
  let fixture: ComponentFixture<BtnprincipalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnprincipalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnprincipalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
