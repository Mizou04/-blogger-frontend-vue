export interface IUser{
  readonly profilePic?: string;
  readonly coverPic?: string;
  readonly id? : string;
  readonly providerId? : string;
  readonly username : string;
  readonly name : string;
  readonly email : string;
  readonly joinedAt? : string;
  readonly lastModified? : string;
  readonly blogPosts?: Record<string, {id : string, title : string, overview : string}> | null;
}
