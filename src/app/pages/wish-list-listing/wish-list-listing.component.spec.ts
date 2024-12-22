import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListListingComponent } from './wish-list-listing.component';

describe('WishListListingComponent', () => {
  let component: WishListListingComponent;
  let fixture: ComponentFixture<WishListListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishListListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
