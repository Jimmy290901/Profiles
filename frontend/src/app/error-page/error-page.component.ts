import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ErrorInterface } from '../model/profile';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorComponent implements OnInit {

  error: ErrorInterface = {
    code: 404,
    message: 'Page Not Found.'
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe((data: Params) => {
      if (data.hasOwnProperty('code')) {
        this.error = <ErrorInterface>data;
      }
    })
  }
}
