import { IOwner } from "./owner";

export interface IBlogPost{
  id : string,
  title : string,
  content : string,
  overview : string,
  thumbnail : string,
  createdAt? : string,
  lastModified? : string,
  owner : IOwner,
}

export interface IBlogPostMin{
  title : string,
  id : string,
  thumb : string,
  overview : string
}
