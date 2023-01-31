import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { CheckUsernameExists } from '../validators/check-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  host: {
    class: 'box'
  },
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  credentials!: FormGroup;
  personalDetails!: FormGroup;
  profileImgGroup!: FormGroup;

  ngOnInit() {
    this.credentials = new FormGroup({
      username: new FormControl('', [Validators.required, NoSpaceValidator, CheckUsernameExists]),
      password: new FormControl('', [Validators.required])
    });
    this.personalDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required])
    });
    this.profileImgGroup = new FormGroup({
      profileImg: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.credentials, this.personalDetails, this.profileImgGroup);
  }
}
