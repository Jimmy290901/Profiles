import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from '../model/profile';
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
          this.dataService.getProfile(params.get('username')!).subscribe((data: Profile) => {
            // console.log(typeof data.profile_img);
            console.log(data);
            if (data === null) {
              this.isLoading = false;
              this.router.navigateByUrl('/not-found');
            } else {
              this.profileData = data;
            }
            this.imgSrc = "data:" + this.profileData.profile_img.contentType + ";base64,"+ Buffer.from(this.profileData.profile_img.data.data).toString('base64');
            this.isLoading = false;
          });
        }
      });
  }

  handleClickUpdateProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
