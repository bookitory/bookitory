import { RequestRegister } from "./reqBody";

export interface Member extends RequestRegister {
    profile: string
}