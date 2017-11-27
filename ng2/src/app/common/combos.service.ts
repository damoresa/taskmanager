import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CombosService {

    private baseUrl: string = 'http://localhost:3300/';
    private baseEndpoint: string = 'api/combos';

    constructor(private http: Http) {}

    getProjects() {
        return this.http.get(this.baseUrl + this.baseEndpoint + '/projects')
            .map((response) => response ? response.json() : {});
    }
}
