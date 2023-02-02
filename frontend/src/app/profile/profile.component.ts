import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from '../model/profile';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.has('username')) {
          let data = this.dataService.getProfile(params.get('username')!);
          if (data === undefined) {
            this.router.navigateByUrl('/not-found');
          } else {
            this.profileData = data;
          }
        }
      });
  }

  handleClickUpdateProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
