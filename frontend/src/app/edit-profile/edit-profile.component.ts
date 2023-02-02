import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NoSpaceValidator } from '../validators/no-space.directive';
import { CheckUsernameExists } from '../validators/check-username';

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

  constructor(private router: Router, private route: ActivatedRoute, private usernameValidator: CheckUsernameExists) {}

  ngOnInit() {
    this.profileUpdateForm = new FormGroup({
      username: new FormControl('', [Validators.required, NoSpaceValidator]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      profileImg: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.profileUpdateForm);
  }

  handleClickDiscard() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
