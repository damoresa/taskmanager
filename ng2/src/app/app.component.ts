import { Component, OnInit } from '@angular/core';

import { SessionStore } from './common/auth/session.store';

@Component({
	selector: 'task-manager',
	templateUrl: './app.component.html'
})
export class TaskManagerComponent implements OnInit {
	
	constructor(private sessionStore: SessionStore) {}
	
	ngOnInit() {
		// If there's a token from a previous session, clear it up
		if (this.sessionStore.token) {
			this.sessionStore.clearToken();
		}
	}
}
