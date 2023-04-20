import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment from "moment";

@Injectable()
export class AuthService {
    
    constructor(private http:HttpClient) {}
    
    setLocalStorage(responseObj:any) {

        // Adds the expiration time defined on the JWT to the current moment
        const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

        localStorage.setItem('id_token', responseObj.token);
        localStorage.setItem('username', responseObj.username);
        localStorage.setItem('userrole', responseObj.userrole);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration(), "second");
    }

    public isAdmin() {
        if(localStorage.getItem('username') == 'admin'){
            return true;
        }
        else{
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        } else {
            return moment();
        }
    }    
}
