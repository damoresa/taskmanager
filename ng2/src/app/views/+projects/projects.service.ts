import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class ProjectsService {

    private baseUrl: string = 'http://localhost:3300/';
    private baseEndpoint: string = 'api/projects';

    constructor(private http: Http) {}

    getProjects() {
        return this.http.get(this.baseUrl + this.baseEndpoint)
            .map((response) => response ? response.json() : {});
    }

    createProject(project) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + this.baseEndpoint, project, headers)
            .map((response) => response ? response.json() : {});
    }

    handleError(error) {
        return Observable.of({ code: 'BK-001', message: 'Error when querying backend' });
    }
}
