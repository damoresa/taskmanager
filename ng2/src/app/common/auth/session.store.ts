import { Injectable } from '@angular/core';

@Injectable()
export class SessionStore {

    private readonly TOKEN_KEY: string = 'AUTH_TOKEN';

    set token(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    get token(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    clearToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }
}
