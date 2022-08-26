import { IOwner } from "../types/owner";

export interface IComment{
    readonly owner : IOwner,
    text : string,
    readonly date : string,
    lastModified : string,
    id : string
  }
