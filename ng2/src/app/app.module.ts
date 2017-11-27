import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { TaskManagerComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CombosService } from './common/combos.service';
import { SECTIONS } from './sections';
import { HomeModule } from './views/home/home.module';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        HomeModule,
        HttpModule
    ],
    declarations: [
        ...SECTIONS,
        TaskManagerComponent
    ],
    providers: [
        CombosService
    ],
    bootstrap: [
        TaskManagerComponent
    ],
})
export class AppModule {}
