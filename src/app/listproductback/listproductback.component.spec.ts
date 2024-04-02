import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductbackComponent } from './listproductback.component';

describe('ListproductbackComponent', () => {
  let component: ListproductbackComponent;
  let fixture: ComponentFixture<ListproductbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListproductbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListproductbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
