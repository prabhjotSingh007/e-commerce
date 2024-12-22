import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterOutletMainComponent } from './router-outlet-main.component';

describe('RouterOutletMainComponent', () => {
  let component: RouterOutletMainComponent;
  let fixture: ComponentFixture<RouterOutletMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutletMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouterOutletMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
