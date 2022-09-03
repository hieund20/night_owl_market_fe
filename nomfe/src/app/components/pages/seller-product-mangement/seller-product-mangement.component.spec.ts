import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductMangementComponent } from './seller-product-mangement.component';

describe('SellerProductMangementComponent', () => {
  let component: SellerProductMangementComponent;
  let fixture: ComponentFixture<SellerProductMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductMangementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
