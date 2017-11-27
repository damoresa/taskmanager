import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Th2ModalComponent } from './../../components/modal/th2-modal.component';

import { ProjectsService } from './projects.service';

@Component({
    selector: 'projects-component',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    projectForm: FormGroup;

    projects;

    @ViewChildren(Th2ModalComponent) private modals: QueryList<Th2ModalComponent>;

    constructor(
        @Inject(FormBuilder) private formBuilder: FormBuilder,
        private projectsService: ProjectsService) {
        this.projectForm = formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(5)]],
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    ngOnInit() {
        this.loadProjects();
    }

    loadProjects() {
        this.projectsService.getProjects().subscribe(
            (projects) => {
                this.projects = projects;
            },
            (error) => {
                console.error(' Error while retrieving projects ' + JSON.stringify(error));
            }
        );
    }

    createProject(project) {
        console.log(JSON.stringify(project));
        this.projectsService.createProject(project).subscribe(
            (result) => {
                this.closeModal('createProjectModal');
                this.loadProjects();
            },
            (error) => {
                console.error(' Error while creating project ' + JSON.stringify(error));
            }
        );
    }

    private closeModal(modalName: string) {
        const modal = this.modals.find((modal) => modal.modalId === modalName);
        modal.dismiss();
    }
}
