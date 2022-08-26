import { IOwner } from "./owner";
import { IComment } from "./comment";

export interface IBlogPost{
  id : string,
  title : string,
  content : string,
  overview : string,
  thumbnail : string,
  createdAt? : string,
  lastModified? : string,
  owner : IOwner,
  likes : {
    length : number,
    data : Record<string, string>
  },
  comments : {
    length : number,
    data : Record<string, IComment>
  },
}

export interface IBlogPostMin{
  title : string,
  id : string,
  thumbnail : string,
  overview : string,
  likes : {
    length : number
  },
  comments : {
    length : number
  },
  createdAt : string
}
