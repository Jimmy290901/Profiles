export interface Profile {
    username: string;
    password: string;
    name: string;
    heightInCm: number;
    gender: Gender;
    dob: Date;
    profile_img?: any;
}

export interface LoginResponse {
    success: boolean,
    token?: string
}

export interface SignupResponse {
    profile: Profile,
    token: string
}

export interface ErrorInterface {
    code: number,
    message: string
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
