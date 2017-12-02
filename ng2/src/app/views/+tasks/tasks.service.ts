import { Inject, Injectable } from '@angular/core';
import { Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';

import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

@Injectable()
export class TasksService {

    private BASE_URL: string;
    private BASE_ENDPOINT: string = 'api/tasks';

    constructor(@Inject(BaseuriInjectionToken) baseURI: string, private http: HttpWrapper) {
        this.BASE_URL = baseURI;
    }

    getTasks(taskCode: string, projectCode: string) {
        const searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('taskCode', taskCode);
        searchParams.set('projectCode', projectCode);

        const requestOptions = new RequestOptions();
        requestOptions.params = searchParams;

        return this.http.get(this.BASE_URL + this.BASE_ENDPOINT, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    getTask(taskId: string) {
        return this.http.get(this.BASE_URL + this.BASE_ENDPOINT + '/' + taskId)
            .map((response) => response ? response.json() : {});
    }

    createTask(task) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http.post(this.BASE_URL + this.BASE_ENDPOINT, task, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    logWork(taskCode: string, log) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http.post(this.BASE_URL + this.BASE_ENDPOINT + '/' + taskCode + '/log', log, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    closeTask(taskCode: string) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http.post(this.BASE_URL + this.BASE_ENDPOINT + '/' + taskCode + '/close', {}, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    linkTasks(taskCode: string, linkedTask: string) {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http.post(this.BASE_URL + this.BASE_ENDPOINT + '/' + taskCode + '/link', linkedTask, requestOptions)
            .map((response) => response ? response.json() : {});
    }

    handleError(error) {
        return Observable.of({ code: 'BK-001', message: 'Error when querying backend' });
    }
}
