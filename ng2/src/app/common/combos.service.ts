import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { BaseuriInjectionToken } from './../common/baseuri.injection.token';
import { HttpWrapper } from './../common/http.wrapper';

@Injectable()
export class CombosService {

    private BASE_URL: string;
    private BASE_ENDPOINT: string = 'api/combos';

    constructor(@Inject(BaseuriInjectionToken) baseURI: string, private http: HttpWrapper) {
        this.BASE_URL = baseURI;
    }

    getProjects(): Observable<any> {
        return this.http.get(this.BASE_URL + this.BASE_ENDPOINT + '/projects')
            .map((response) => response ? response.json() : {});
    }
}
