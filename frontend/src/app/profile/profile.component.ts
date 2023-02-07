import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorInterface, Profile } from '../model/profile';
import { DataService } from '../services/data.service';

var Buffer = require('buffer/').Buffer;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  host: {
    class: 'box'
  },
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData!: Profile; 
  isLoading!: boolean;
  imgSrc!: string;

  constructor(private dataService: DataService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('username')) {
        this.dataService.getProfile(params.get('username')!).subscribe({
          next: (data: Profile) => {
            this.profileData = {
              ...data,
              dob: new Date(data.dob)
            }
            this.imgSrc = this.dataService.decodeImgBase64(this.profileData.profile_img);
            console.log(this.profileData);
            this.isLoading = false;
          }, 
          error: (err: ErrorInterface) => {
            console.log(err);
            this.router.navigate(['/error'], {queryParams: err});
          }
        });
      }
    });
  }

  handleClickUpdateProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
