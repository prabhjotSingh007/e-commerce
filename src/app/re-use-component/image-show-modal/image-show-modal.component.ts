import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-show-modal',
  standalone: true,
  imports: [],
  templateUrl: './image-show-modal.component.html',
  styleUrl: './image-show-modal.component.css'
})
export class ImageShowModalComponent {

  @Input() getImage: any; // storing shared image from parent
  currentImagetoShow: any = null // storing the current image to show


  /**
   * 
   * @param changes using life cycle hook to detect change 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getImage']) {
      this.currentImagetoShow = changes['getImage'].currentValue
      // console.log(changes)
      // console.log(this.currentImagetoShow)
    }

  }

  // updating the image url to null to store

  updateImageUrl() {
    this.currentImagetoShow = null
  }

}
