import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { TaskDetailComponent } from './task.detail.component';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks.routing';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TasksRoutingModule,
        Thin2ComponentsModule
    ],
    declarations: [
        TaskDetailComponent,
        TasksComponent
    ],
    providers: [
        TasksService
    ]
})
export class TasksModule {}
