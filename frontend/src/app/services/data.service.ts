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

  /*rework this - shows error in signup and update profile*/
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
    if (this.noProfiles()) {
      return false;
    }
    for (let i = 0; i < this.usersProfile.length; i++) {
      if (this.usersProfile[i].username === username) {
        return true;
      }
    }
    return false;
  }

  verifyCredentials(username: string, password: string): boolean {
    const userProfile = this.getProfile(username);
    if (userProfile === undefined || userProfile.password !== password) {
      return false;
    }
    return true;
  }

  registerUser(newProfile: Profile) {
    if (this.noProfiles()) {
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

  noProfiles() {
    return this.usersProfile === undefined;
  }

  getProfile(username: string) {
    if (this.noProfiles()) {
      return undefined;
    }
    return this.usersProfile.find((profile) => {
      return profile.username === username;
    });
  }

  updateData(updatedProfile: Profile, username: string) {
    const idx = this.usersProfile.findIndex(profile => profile.username === username);
    this.usersProfile[idx] = updatedProfile;
    console.log(this.usersProfile);
  }

}
