import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetailComponent } from './task.detail.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
    { path: '', component: TasksComponent },
    { path: ':taskId', component: TaskDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TasksRoutingModule {}
