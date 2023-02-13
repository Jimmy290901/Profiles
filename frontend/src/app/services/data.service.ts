import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { Gender, Profile, LoginResponse, SignupResponse } from '../model/profile';

// import { ProfileServiceClient } from '../proto/ProfilesServiceClientPb';
// import { UsernameRequest } from '../proto/profiles_pb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private TOKEN_KEY = 'token'
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
    return this.http.get(this.api_url+'/check-username', {
      observe: 'body',
      responseType: 'json',
      params: {
        'username': username,
        'exception': exception
      }
    });
  }

  verifyCredentials(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api_url+'/login', {
      'credentials': 'Basic ' + Buffer.from(`${username} ${password}`).toString('base64')
    }, 
    {
      observe: 'body',
      responseType: 'json',
    });
  }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  fetchToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  updateToken(newToken: string) {
    localStorage.setItem(this.TOKEN_KEY, newToken);
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

  registerUser(newProfile: Profile): Observable<SignupResponse> {
    const formData = this.createFromData(newProfile);
    return this.http.post<SignupResponse>(this.api_url+'/signup', formData);
  }

  getProfile(username: string) {
    return this.http.get<Profile>(this.api_url+'/profile/'+username, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateData(updatedProfile: Profile, username: string) {
    const formData = this.createFromData(updatedProfile);
    return this.http.patch(this.api_url+'/profile/'+username+'/edit', formData);
  }

  getAllProfiles() {
    return this.http.get<[Profile]>(this.api_url+'/profiles/all', {
      observe: 'body',
      responseType: 'json',
    });
  }

  decodeImgBase64(profile_img: any) {
    return "data:" + profile_img.contentType + ";base64,"+ Buffer.from(profile_img.data.data).toString('base64');
  }

}
