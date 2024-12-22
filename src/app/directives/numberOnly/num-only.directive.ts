import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appNumOnly]",
  standalone: true,
})
export class NumOnlyDirective {
  constructor() {}

  @HostListener("keypress", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    const charCode = event.key;
    if (charCode < "0" || charCode > "9") {
      event.preventDefault();
    }
  }
  @HostListener("paste", ["$event"])
  onPaste(event: KeyboardEvent) {
      event.preventDefault();
  }
  
  @HostListener("drop", ["$event"])
  onDrop(event: KeyboardEvent) {
      event.preventDefault();
  }
}
