export interface Profile {
    username: string;
    password: string;
    name: string;
    heightInCm: number;
    gender: Gender;
    dob: Date;
    profile_img_url: string;
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
