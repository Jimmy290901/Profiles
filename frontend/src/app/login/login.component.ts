import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {}

  onSubmit(f: NgForm) {
    if (this.dataService.verifyCredentials(f.value.username, f.value.password)) {
      this.router.navigate(['profile/', f.value.username]);
    } else {
      this.snackbar.open('Invalid Credentials. Try Again!', 'Close')
    }
  }

}
