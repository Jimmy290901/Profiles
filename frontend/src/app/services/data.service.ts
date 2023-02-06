import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Gender, Profile } from '../model/profile';

// import { ProfileServiceClient } from '../proto/ProfilesServiceClientPb';
// import { UsernameRequest } from '../proto/profiles_pb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersProfile: [Profile] = [{
    username: 'admin',
    password: 'admin',
    name: 'Administrator',
    heightInCm: 100,
    gender: Gender.FEMALE,
    dob: new Date(),
    // profile_img: 'assets/images/sample.png'
  }];

  private api_url = 'http://localhost:3000';
  // private baseApiUrl = "https://file.io";

  // private profileService: ProfileServiceClient;
  constructor(private http: HttpClient) {
    // this.profileService = new ProfileServiceClient('http://localhost:8080', null, null);
  }

  /*rework this - shows error in signup and update profile*/
  checkUsername(username: string, exception: string): Observable<ValidationErrors | null> {
    // const request = new UsernameRequest();
    // request.setUsername(username);
    // this.profileService.usernameExists(request, {}, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(response);
    //   }
    // });
    // if (this.noProfiles()) {
    //   return false;
    // }
    // for (let i = 0; i < this.usersProfile.length; i++) {
    //   if (this.usersProfile[i].username !== exception && this.usersProfile[i].username === username) {
    //     return true;
    //   }
    // }
    // return false;
    return this.http.get(this.api_url+'/check-username', {
      observe: 'body',
      responseType: 'json',
      params: {
        'username': username,
        'exception': exception
      }
    });
  }

  verifyCredentials(username: string, password: string): boolean {
    // const userProfile = this.getProfile(username);
    // if (userProfile === undefined || userProfile.password !== password) {
    //   return false;
    // }
    return true;
  }

  createFromData(newProfile: Profile): FormData {
    const formData = new FormData();
    if (newProfile.hasOwnProperty('profile_img')) {
      formData.append('profile_img', newProfile.profile_img, newProfile.profile_img.name);
    }
    formData.append('username', newProfile.username);
    formData.append('password', newProfile.password);
    formData.append('name', newProfile.name);
    formData.append('dob', newProfile.dob.toDateString());
    formData.append('gender', newProfile.gender);
    formData.append('heightInCm', newProfile.heightInCm.toString());
    return formData;
  }

  registerUser(newProfile: Profile) {
    const formData = this.createFromData(newProfile);
    return this.http.post(this.api_url+'/signup', formData);
    
    
    // if (this.noProfiles()) {
    //   this.usersProfile = [newProfile];
    // } else {
    //   this.usersProfile.push(newProfile);
    // }
  }

  noProfiles() {
    return this.usersProfile === undefined;
  }

  getProfile(username: string) {
    return this.http.get<Profile>(this.api_url+'/profile/'+username, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateData(updatedProfile: Profile, username: string) {
    // const idx = this.usersProfile.findIndex(profile => profile.username === username);
    // this.usersProfile[idx] = updatedProfile;
    // console.log(this.usersProfile);
    const formData = this.createFromData(updatedProfile);
    return this.http.patch(this.api_url+'/profile/'+username+'/edit', formData);
  }

}
