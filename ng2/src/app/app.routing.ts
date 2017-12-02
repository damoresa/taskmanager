import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './common/auth/auth.guard';

import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'projects', loadChildren: './views/+projects/projects.module#ProjectsModule', canActivate: [AuthGuard] },
    { path: 'tasks', loadChildren: './views/+tasks/tasks.module#TasksModule', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
