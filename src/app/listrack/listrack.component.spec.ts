import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrackComponent } from './listrack.component';

describe('ListrackComponent', () => {
  let component: ListrackComponent;
  let fixture: ComponentFixture<ListrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
