import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { CheckUsernameExists } from '../validators/check-username';
import { DataService } from '../services/data.service';
import { Profile } from '../model/profile';

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

  constructor(private dataService: DataService) {}

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

  handleOnClick() {
    this.dataService.checkUsername(this.credentials.value.username);
  }

  onSubmit() {
    
    // const newProfile: Profile = {
    //   username: this.credentials.value.username,
    //   password: this.credentials.value.password,
    //   name: this.personalDetails.value.name,
    //   heightInCm: this.personalDetails.value.height,
    //   gender: this.personalDetails.value.gender,
    //   dob: this.personalDetails.value.dob,
    // }
    // this.dataService.registerUser(newProfile);
  }
}
