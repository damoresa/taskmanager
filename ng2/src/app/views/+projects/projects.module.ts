import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects.routing';
import { ProjectsService } from './projects.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProjectsRoutingModule,
        Thin2ComponentsModule
    ],
    declarations: [
        ProjectsComponent
    ],
    providers: [
        ProjectsService
    ]
})
export class ProjectsModule {}
