import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class TasksService {

    private baseUrl: string = 'http://localhost:3300/';
    private baseEndpoint: string = 'api/tasks';

    constructor(private http: Http) {}

    getTasks(taskCode: string, projectCode: string) {
        const searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('taskCode', taskCode);
        searchParams.set('projectCode', projectCode);

        return this.http.get(this.baseUrl + this.baseEndpoint, {
                search: searchParams
            })
            .map((response) => response ? response.json() : {});
    }

    getTask(taskId: string) {
        return this.http.get(this.baseUrl + this.baseEndpoint + '/' + taskId)
            .map((response) => response ? response.json() : {});
    }

    createTask(task) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + this.baseEndpoint, task, headers)
            .map((response) => response ? response.json() : {});
    }

    logWork(taskCode: string, log) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + this.baseEndpoint + '/' + taskCode + '/log', log, headers)
            .map((response) => response ? response.json() : {});
    }

    closeTask(taskCode: string) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + this.baseEndpoint + '/' + taskCode + '/close', {}, headers)
            .map((response) => response ? response.json() : {});
    }

    linkTasks(taskCode: string, linkedTask: string) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + this.baseEndpoint + '/' + taskCode + '/link', linkedTask, headers)
            .map((response) => response ? response.json() : {});
    }

    handleError(error) {
        return Observable.of({ code: 'BK-001', message: 'Error when querying backend' });
    }
}
