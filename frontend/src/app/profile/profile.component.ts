import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  host: {
    class: 'box'
  },
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  handleClickUpdateProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
