import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../model/profile';
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
  isLoading!: boolean;
  usernameVal: string = '';
  passwordVal: string = '';

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {}

  onSubmit(f: NgForm) {
    if (f.invalid) {
      this.snackbar.open('Invalid Credentials. Try Again!', 'Close');
      return;
    }
    this.isLoading = true;
    this.dataService.verifyCredentials(this.usernameVal, this.passwordVal).subscribe((data: LoginResponse) => {
      this.isLoading = false;
      if (data.success) {
        if (data.token) {
          this.dataService.storeToken(data.token);
        }
        this.snackbar.dismiss();
        this.router.navigate(['profile/', this.usernameVal]);
      } else {
        this.snackbar.open('Invalid Credentials. Try Again!', 'Close');
      }
    });
  }

}
