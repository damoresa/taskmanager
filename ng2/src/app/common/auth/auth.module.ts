import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const COMPONENTS = [
    AuthComponent
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        Thin2ComponentsModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                AuthGuard,
                AuthService
            ]
        }
    }
}
