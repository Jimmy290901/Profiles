import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { CheckUsernameExists } from '../validators/check-username';
import { DataService } from '../services/data.service';
import { Profile } from '../model/profile';
import { firstValueFrom } from 'rxjs';

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
  profileImgFile!: File;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private usernameValidator: CheckUsernameExists) {}

  ngOnInit() {
    this.credentials = new FormGroup({
      username: new FormControl('', [Validators.required, NoSpaceValidator, this.usernameValidator.validate]),    //error due to usernameValidator
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

  onImgChange() {
      this.profileImgFile = this.profileImgGroup.value.profileImg._files[0];
  }

  async onSubmit() {
    const event: any = await firstValueFrom(this.dataService.uploadFile(this.profileImgFile));
    const newProfile: Profile = {
      username: this.credentials.value.username,
      password: this.credentials.value.password,
      name: this.personalDetails.value.name,
      heightInCm: this.personalDetails.value.height,
      gender: this.personalDetails.value.gender,
      dob: this.personalDetails.value.dob,
      profile_img_url: event.link
    }
    this.dataService.registerUser(newProfile);

    // console.log(this.img.nativeElement);
    // console.log(URL.createObjectURL(this.img.nativeElement.files[0]));
    // console.log(URL.createObjectURL(this.profileImgGroup.value.profileImg));

    // this.router.navigate(['profile/',this.credentials.value.username]);
  }
}
