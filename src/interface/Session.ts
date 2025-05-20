import type { Message } from "genkit";


export interface Session{
    _id?:string,
    uid:string,
    message:Message & { time?: Date }[]
    title?:string,
}