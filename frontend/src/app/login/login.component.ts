import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'box'
  },
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
}
