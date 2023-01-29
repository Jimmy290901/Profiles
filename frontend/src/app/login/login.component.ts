import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit(f: NgForm) {
    console.log(f);
  }

}
