import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallComponent } from './modall.component';

describe('ModallComponent', () => {
  let component: ModallComponent;
  let fixture: ComponentFixture<ModallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
