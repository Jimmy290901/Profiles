import { Injectable } from '@angular/core';

import { Profile } from '../model/profile';

import { ProfileServiceClient } from '../proto/ProfilesServiceClientPb';
import { UsernameRequest } from '../proto/profiles_pb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersProfile!: [Profile];
  // private profileImgFolderPath: string = __dirname + '/../../assets/images/';

  // private profileService: ProfileServiceClient;
  constructor() { 
    // this.profileService = new ProfileServiceClient('http://localhost:8080', null, null);
  }

  checkUsername(username: string) {
    // const request = new UsernameRequest();
    // request.setUsername(username);
    // this.profileService.usernameExists(request, {}, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(response);
    //   }
    // });
  }

  registerUser(newProfile: Profile) {
    this.usersProfile.push(newProfile);
  }

  storeImage(imgPath: string) {
    // const fs = require('fs');
    // fs.copyFile(imgPath,  this.profileImgFolderPath, (err: any) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("Profile Image stored successfully!");
    // })
  }

}
