import { Inject, Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';

import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

@Injectable()
export class ProjectsService {

    private BASE_URL: string;
    private BASE_ENDPOINT: string = 'api/projects';

    constructor(@Inject(BaseuriInjectionToken) baseURI: string, private http: HttpWrapper) {
        this.BASE_URL = baseURI;
    }

    getProjects() {
        return this.http.get(this.BASE_URL + this.BASE_ENDPOINT)
            .map((response) => response ? response.json() : {});
    }

    createProject(project) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http.post(this.BASE_URL + this.BASE_ENDPOINT, project, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    handleError(error) {
        return Observable.of({ code: 'BK-001', message: 'Error when querying backend' });
    }
}
