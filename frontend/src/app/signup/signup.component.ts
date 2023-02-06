import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { UsernameExistsService } from '../validators/username-exists.service';
import { DataService } from '../services/data.service';
import { Profile } from '../model/profile';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoading!: boolean;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private usernameValidatorService: UsernameExistsService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.isLoading = true;
    this.credentials = new FormGroup({
      username: new FormControl('', [Validators.required, NoSpaceValidator], [this.usernameValidatorService.validate('')]),
      password: new FormControl('', [Validators.required])
    });
    this.personalDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      height: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl(undefined, [Validators.required])
    });
    this.profileImgGroup = new FormGroup({
      profileImg: new FormControl(undefined, [Validators.required])
    });
    this.isLoading = false;
  }

  onImgChange() {
    // this.profileImgFile = event.target.files[0];
    // console.log(this.profileImgGroup.value.profileImg);
    this.profileImgFile = this.profileImgGroup.value.profileImg?._files[0];
    // console.log(this.profileImgFile);
    // console.log('file content', await this.profileImgFile.text());
    
  }

  async onSubmit() {
    if ((!this.credentials.valid) || (!this.personalDetails.valid) || (!this.profileImgGroup.valid)) {
      if (!this.profileImgGroup.valid) {
        this.snackbar.open('Profile Image Field is required!', 'Close');
      } else {
        this.snackbar.open('Form incomplete. Try Again!', 'Close');
      } 
      return;
    }
    const newProfile: Profile = {
      username: this.credentials.value.username,
      password: this.credentials.value.password,
      name: this.personalDetails.value.name,
      heightInCm: this.personalDetails.value.height,
      gender: this.personalDetails.value.gender,
      dob: this.personalDetails.value.dob,
      profile_img: this.profileImgFile
    }
    this.isLoading = true;
    this.dataService.registerUser(newProfile).subscribe((data:any) => {
      console.log(data);
      this.isLoading = false;
      this.router.navigate(['profile/',this.credentials.value.username]);
    })

    // console.log(this.img.nativeElement);
    // console.log(URL.createObjectURL(this.img.nativeElement.files[0]));
    // console.log(URL.createObjectURL(this.profileImgGroup.value.profileImg));

  }
}
