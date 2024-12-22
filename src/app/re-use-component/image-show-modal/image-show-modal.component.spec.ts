import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShowModalComponent } from './image-show-modal.component';

describe('ImageShowModalComponent', () => {
  let component: ImageShowModalComponent;
  let fixture: ComponentFixture<ImageShowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageShowModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
