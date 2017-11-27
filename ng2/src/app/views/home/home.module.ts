import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
    imports: [
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {}
