export interface User{
  readonly id? : string;
  readonly providerId? : string;
  readonly username : string;
  readonly name : string;
  readonly email : string;
  readonly joinedAt? : string;
  readonly lastModified? : string;
}
