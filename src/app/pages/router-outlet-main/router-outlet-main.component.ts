import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../re-use-component/header/header.component";

@Component({
  selector: 'app-router-outlet-main',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './router-outlet-main.component.html',
  styleUrl: './router-outlet-main.component.css'
})
export class RouterOutletMainComponent {

}
