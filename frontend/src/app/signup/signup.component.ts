import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NoSpaceDirective, NoSpaceValidator } from '../../shared/no-space.directive';

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
      username: new FormControl(null, [Validators.required, NoSpaceValidator]),
      password: new FormControl(null, [Validators.required])
    });
    this.personalDetails = new FormGroup({
      name: new FormControl(null, [Validators.required]),
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
