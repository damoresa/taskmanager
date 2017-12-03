import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { TaskManagerComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './common/auth/auth.module';
import { BaseuriInjectionToken } from './common/baseuri.injection.token';
import { CombosService } from './common/combos.service';
import { HttpWrapper } from './common/http.wrapper';
import { SessionStore } from './common/auth/session.store';
import { SECTIONS } from './sections';
import { HomeModule } from './views/home/home.module';

@NgModule({
    imports: [
        AppRoutingModule,
        AuthModule.forRoot(),
        BrowserModule,
        HomeModule,
        HttpModule
    ],
    declarations: [
        ...SECTIONS,
        TaskManagerComponent
    ],
    providers: [
        {
            provide: BaseuriInjectionToken,
            useValue: '/' || 'http://localhost:3300/'
        },
        CombosService,
        HttpWrapper,
        SessionStore
    ],
    bootstrap: [
        TaskManagerComponent
    ],
})
export class AppModule {}
