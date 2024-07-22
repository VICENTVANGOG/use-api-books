import {BodyRequestLogin, BodyResponseLogin} from "../models/auth.model";

export class UsersController {
 public domain: string;

 constructor(domain: string){
    this.domain = domain;
 }
 async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin>{
    const userData: BodyRequestLogin = {
        email: email.value,
        password: password.value
    };

    const headers: Record<string, string> = {
        'accept': '*/*',
        'Content-Type': 'application/json'
    };

    const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userData)
    };

    const response: Response = await fetch(`${this.domain}/api/v1/auth/login`, reqOptions);

    if(!response.ok){
        console.log(`Response body: ${(await response.json()).message}`);
        throw new Error(`Error: ${response.status}: ${response.statusText}`);
    }
    const responseBodyLogin: BodyResponseLogin = await response.json();
    return responseBodyLogin;
 }
}