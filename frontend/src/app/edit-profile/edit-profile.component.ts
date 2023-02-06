import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { UsernameExistsService } from '../validators/username-exists.service';
import { Profile } from '../model/profile';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  host: {
    class: 'box'
  },
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  hide: boolean = true;
  profileUpdateForm!: FormGroup;
  profileData!: Profile; 
  username!: string;
  isLoading!: boolean;
  profileImgFile!: File;

  constructor(private dataService: DataService,private router: Router, private route: ActivatedRoute, private usernameValidatorService: UsernameExistsService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;
      this.route.paramMap.subscribe(async (params: ParamMap) => {
        if (params.has('username')) {
          this.dataService.getProfile(params.get('username')!).subscribe((data: Profile) => {
            if (data === null) {
              this.isLoading = false;
              this.router.navigateByUrl('/not-found');
            } else {
              this.profileData = {
                ...data,
                dob: new Date(data.dob)
              }
              this.username = data.username;
              this.profileUpdateForm = new FormGroup({
                username: new FormControl(this.profileData.username, [Validators.required, NoSpaceValidator], [this.usernameValidatorService.validate(this.profileData.username)]),
                password: new FormControl(this.profileData.password, [Validators.required]),
                name: new FormControl(this.profileData.name, [Validators.required]),
                heightInCm: new FormControl(+this.profileData.heightInCm, [Validators.required, Validators.min(0)]),
                gender: new FormControl(this.profileData.gender, [Validators.required]),
                dob: new FormControl(this.profileData.dob, [Validators.required]),
                profile_img: new FormControl(undefined)
              });
            }
            console.log(this.profileData);
            this.isLoading = false;
          });
        }
      });
  }

  onImgChange() {
    // this.profileImgFile = event.target.files[0];
    // console.log(this.profileImgGroup.value.profileImg);
    this.profileImgFile = this.profileUpdateForm.value.profile_img?._files[0];
    console.log(this.profileImgFile);
    // console.log('file content', await this.profileImgFile.text());
    
  }

  async onSubmit() {
    if (!this.profileUpdateForm.valid) {
      console.log(this.profileUpdateForm);
      this.snackbar.open('Form incomplete. Try Again!', 'Close');
      return;
    }
    this.profileData = {
      username: this.profileUpdateForm.value.username,
      password: this.profileUpdateForm.value.password,
      name: this.profileUpdateForm.value.name,
      heightInCm: this.profileUpdateForm.value.heightInCm,
      gender: this.profileUpdateForm.value.gender,
      dob: this.profileUpdateForm.value.dob,
    }
    if (this.profileImgFile !== undefined) {
      this.profileData.profile_img = this.profileImgFile;
    }
    this.isLoading = true;
    this.dataService.updateData(this.profileData, this.username).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
      this.router.navigate(['profile/',this.profileUpdateForm.value.username]);
    })
  }

  onDiscard() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
