export class AuthEvent {
    constructor(
        public authed: boolean,
        public username: string,
        public message: string
    ) { }
}
