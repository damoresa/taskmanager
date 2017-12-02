import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { SessionStore } from './auth/session.store';

@Injectable()
export class HttpWrapper {

    constructor(private http: Http, private sessionStore: SessionStore) {}

    addAuthHeader(requestOptions: RequestOptions) {
        const token = this.sessionStore.token;

        if (token) {
            const headers: Headers = requestOptions.headers ? requestOptions.headers : new Headers();
            headers.append('Authorization', `bearer ${token}`);
            requestOptions.headers = headers;
        }
    }

    get(endpointUrl: string, options?: RequestOptions): Observable<Response> {

        let requestOptions: RequestOptions;
        if (options) {
            requestOptions = options;
        } else {
            requestOptions = new RequestOptions();
        }
        this.addAuthHeader(requestOptions);

        return this.http.get(endpointUrl, requestOptions);
    }

    post(endpointUrl: string, data?: any, options?: RequestOptions): Observable<Response> {

        let requestOptions: RequestOptions;
        if (options) {
            requestOptions = options;
        } else {
            requestOptions = new RequestOptions();
        }
        this.addAuthHeader(requestOptions);

        if (data) {
            return this.http.post(endpointUrl, data, requestOptions);
        } else {
            return this.http.post(endpointUrl, undefined, requestOptions);
        }
    }
}
