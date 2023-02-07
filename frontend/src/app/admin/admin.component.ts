import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorInterface, Profile } from '../model/profile';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  profiles!: [Profile];
  isEmpty: boolean = true;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataService.getAllProfiles().subscribe({
      next: (data: [Profile]) => {
        if (data.length > 0) {
          this.isEmpty = false;
          this.profiles = data;
          console.log(this.isEmpty);
        }
      },
      error: (err: ErrorInterface) => {
        console.log(err);
        this.router.navigate(['/error'], {queryParams: err});
      }
    })
  }

  getImgSrc(profile_img: any) {
    return this.dataService.decodeImgBase64(profile_img);
  }
}
