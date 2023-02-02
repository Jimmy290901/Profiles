import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { CheckUsernameExists } from '../validators/check-username';
import { Profile } from '../model/profile';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.has('username')) {
          let data = this.dataService.getProfile(params.get('username')!);
          if (data === undefined) {
            this.router.navigateByUrl('/not-found');
          } else {
            this.profileData = data;
            this.username = data.username;
            this.profileUpdateForm = new FormGroup({
              username: new FormControl(this.profileData.username, [Validators.required, NoSpaceValidator]),
              password: new FormControl(this.profileData.password, [Validators.required]),
              name: new FormControl(this.profileData.name, [Validators.required]),
              heightInCm: new FormControl(+this.profileData.heightInCm, [Validators.required, Validators.min(0)]),
              gender: new FormControl(this.profileData.gender, [Validators.required]),
              dob: new FormControl(this.profileData.dob, [Validators.required]),
              profile_img_url: new FormControl(null, [Validators.required])
            });
          }
        }
      });
  }

  onSubmit() {
    this.dataService.updateData(this.profileUpdateForm.value, this.username);
    this.router.navigate(['profile/',this.profileUpdateForm.value.username]);
  }

  onDiscard() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
