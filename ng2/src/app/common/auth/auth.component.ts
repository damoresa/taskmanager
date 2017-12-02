import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Th2ModalComponent } from './../../components/modal/th2-modal.component';

import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    authForm;
    authModal: string = 'authModal';

    @ViewChild(Th2ModalComponent) private modal: Th2ModalComponent;

    constructor(private authService: AuthService,
                @Inject(FormBuilder) formBuilder: FormBuilder) {

        this.authForm = formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    showLogin() {
        this.modal.show();
    }

    hideLogin() {
        this.modal.dismiss();
    }
    
    login(auth: AuthModel) {
        this.authService.login(auth);
    }

}
