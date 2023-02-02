import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Profile } from '../model/profile';

import { ProfileServiceClient } from '../proto/ProfilesServiceClientPb';
import { UsernameRequest } from '../proto/profiles_pb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersProfile!: [Profile];
  private baseApiUrl = "https://file.io";

  // private profileService: ProfileServiceClient;
  constructor(private http: HttpClient) {
    // this.profileService = new ProfileServiceClient('http://localhost:8080', null, null);
  }

  checkUsername(username: string): boolean {
    // const request = new UsernameRequest();
    // request.setUsername(username);
    // this.profileService.usernameExists(request, {}, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(response);
    //   }
    // });
    if (this.usersProfile === undefined) {
      return false;
    }
    for (let i = 0; i < this.usersProfile.length; i++) {
      if (this.usersProfile[i].username === username) {
        return true;
      }
    }
    return false;
  }

  registerUser(newProfile: Profile) {
    if (this.usersProfile === undefined) {
      this.usersProfile = [newProfile];
    } else {
      this.usersProfile.push(newProfile);
    }
  }

  uploadFile(img: File) {
    const formData = new FormData();
    formData.append('file', img, img.name);
    return this.http.post(this.baseApiUrl, formData);
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
