import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTabComponent } from './product-list-tab.component';

describe('ProductListTabComponent', () => {
  let component: ProductListTabComponent;
  let fixture: ComponentFixture<ProductListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
