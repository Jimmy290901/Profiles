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

  constructor(private dataService: DataService,private router: Router, private route: ActivatedRoute, private usernameValidatorService: UsernameExistsService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(async (params: ParamMap) => {
        if (params.has('username')) {
          this.dataService.getProfile(params.get('username')!).subscribe((data: Profile) => {
            console.log(data);
            if (data === null) {
              this.router.navigateByUrl('/not-found');
            } else {
              this.profileData = data;
              this.username = data.username;
              this.profileUpdateForm = new FormGroup({
                username: new FormControl(this.profileData.username, [Validators.required, NoSpaceValidator, this.usernameValidatorService.validate(this.username)]),
                password: new FormControl(this.profileData.password, [Validators.required]),
                name: new FormControl(this.profileData.name, [Validators.required]),
                heightInCm: new FormControl(+this.profileData.heightInCm, [Validators.required, Validators.min(0)]),
                gender: new FormControl(this.profileData.gender, [Validators.required]),
                dob: new FormControl(this.profileData.dob, [Validators.required]),
                // profile_img_url: new FormControl(null, [Validators.required])
              });
            }
          });
        }
      });
  }

  onSubmit() {
    if (!this.profileUpdateForm.valid) {
      this.snackbar.open('Form incomplete. Try Again!', 'Close');
      return;
    }
    this.dataService.updateData(this.profileUpdateForm.value, this.username);
    this.router.navigate(['profile/',this.profileUpdateForm.value.username]);
  }

  onDiscard() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
