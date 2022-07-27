export interface IBlogPost{
  readonly id? : string,
  readonly title? : string,
  readonly content? : string,
  readonly overview? : string,
  readonly thumbnail? : string,
  readonly createdAt? : string,
  readonly lastModified? : string,
  readonly owner? : {
    id : string,
    email : string,
    profilePic : string, 
    username : string,
  },
}

export interface IBlogPostMin{
  title : string,
  id : string,
  thumb : string,
  overview : string
}