import { Injectable } from '@angular/core';
import { ProfileServiceClient } from '../proto/ProfilesServiceClientPb';
import { UsernameRequest } from '../proto/profiles_pb';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private profileService: ProfileServiceClient;
  constructor() { 
    this.profileService = new ProfileServiceClient('http://localhost:8080', null, null);
  }

  checkUsername(username: string) {
    const request = new UsernameRequest();
    request.setUsername(username);
    this.profileService.usernameExists(request, {}, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    })
  }

}
