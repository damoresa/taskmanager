import { Inject, Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import { BaseuriInjectionToken } from './../baseuri.injection.token';
import { HttpWrapper } from './../http.wrapper';

import { AuthEvent } from './auth.event';
import { AuthModel } from './auth.model';
import { SessionStore } from './session.store';

@Injectable()
export class AuthService {

    private BASE_URL: string;
    private LOGIN_ENDPOINT: string = 'auth/login';
    private SESSION_INFO_ENDPOINT: string = 'auth/info';

    private userAuthenticated: Subject<AuthEvent> = new Subject<AuthEvent>();

    constructor(@Inject(BaseuriInjectionToken) baseURI: string,
                private http: HttpWrapper,
                private sessionStore: SessionStore) {
        this.BASE_URL = baseURI;
    }

    login(auth: AuthModel) {
        // This subscription is deemed neccesary in order to emit to more than a single component in the application.
        const headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions(headers => requestOptions);
        this.http.post(this.BASE_URL + this.LOGIN_ENDPOINT, auth, requestOptions)
            .map((response) => response ? response.json() : {})
            .catch(this.manageError)
            .subscribe(
                (data) => {
                    if (data && data.token) {
                        this.sessionStore.token = data.token;
                        const authEvent = new AuthEvent(true, auth.username, `${auth.username} succesfully logged in`);
                        this.userAuthenticated.next(authEvent);
                    } else {
                        const authEvent = new AuthEvent(false, auth.username, `Error when logging in as ${auth.username}`);
                        this.userAuthenticated.next(authEvent);
                    }
                },
                (error) => {
                    const authEvent = new AuthEvent(false, auth.username, `Error when logging in as ${auth.username}`);
                    this.userAuthenticated.next(authEvent);
                }
            );
    }

    isAuthed(): boolean {
        if (this.sessionStore.token) {
            return true;
        } else {
            return false;
        }
    }

    sessionInfo(): Observable<any> {
        return this.http.get(this.BASE_URL + this.SESSION_INFO_ENDPOINT)
            .map((response) => response ? response.json() : {})
            .catch(this.manageError);
    }

    logout() {
        this.sessionStore.clearToken();
        const authEvent = new AuthEvent(false, '', 'User logged out');
        this.userAuthenticated.next(authEvent);
    }

    sessionStatus(): Observable<AuthEvent> {
        return this.userAuthenticated.asObservable();
    }

    private manageError(error): Observable<any> {
        console.error(`Authentication error ${error}`);
        return Observable.of({});
    }
}
