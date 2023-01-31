import * as jspb from 'google-protobuf'



export class UsernameRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): UsernameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsernameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UsernameRequest): UsernameRequest.AsObject;
  static serializeBinaryToWriter(message: UsernameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsernameRequest;
  static deserializeBinaryFromReader(message: UsernameRequest, reader: jspb.BinaryReader): UsernameRequest;
}

export namespace UsernameRequest {
  export type AsObject = {
    username: string,
  }
}

export class ExistsResponse extends jspb.Message {
  getExists(): boolean;
  setExists(value: boolean): ExistsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExistsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExistsResponse): ExistsResponse.AsObject;
  static serializeBinaryToWriter(message: ExistsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExistsResponse;
  static deserializeBinaryFromReader(message: ExistsResponse, reader: jspb.BinaryReader): ExistsResponse;
}

export namespace ExistsResponse {
  export type AsObject = {
    exists: boolean,
  }
}

export class Credentials extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): Credentials;

  getPassword(): string;
  setPassword(value: string): Credentials;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Credentials.AsObject;
  static toObject(includeInstance: boolean, msg: Credentials): Credentials.AsObject;
  static serializeBinaryToWriter(message: Credentials, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Credentials;
  static deserializeBinaryFromReader(message: Credentials, reader: jspb.BinaryReader): Credentials;
}

export namespace Credentials {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class UserData extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): UserData;

  getPassword(): string;
  setPassword(value: string): UserData;

  getName(): string;
  setName(value: string): UserData;

  getHeightincm(): number;
  setHeightincm(value: number): UserData;

  getDob(): string;
  setDob(value: string): UserData;

  getProfileImg(): Uint8Array | string;
  getProfileImg_asU8(): Uint8Array;
  getProfileImg_asB64(): string;
  setProfileImg(value: Uint8Array | string): UserData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserData.AsObject;
  static toObject(includeInstance: boolean, msg: UserData): UserData.AsObject;
  static serializeBinaryToWriter(message: UserData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserData;
  static deserializeBinaryFromReader(message: UserData, reader: jspb.BinaryReader): UserData;
}

export namespace UserData {
  export type AsObject = {
    username: string,
    password: string,
    name: string,
    heightincm: number,
    dob: string,
    profileImg: Uint8Array | string,
  }

  export enum Gender { 
    MALE = 0,
    FEMALE = 1,
  }
}

