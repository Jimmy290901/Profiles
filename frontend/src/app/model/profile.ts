export interface Profile {
    username: string;
    password: string;
    name: string;
    heightInCm: number;
    gender: Gender;
    dob: Date;
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
