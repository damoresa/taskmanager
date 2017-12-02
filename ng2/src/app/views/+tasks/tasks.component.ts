import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { CombosService } from '../../common/combos.service';
import { Th2ModalComponent } from './../../components/modal/th2-modal.component';
import { stringToMinutes } from './../../utils/time.formatter';

import { TasksService } from './tasks.service';

@Component({
	selector: 'tasks-component',
	templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

	filterForm: FormGroup;
	taskForm: FormGroup;
	timeForm: FormGroup;
	linkForm: FormGroup;

	projects = [];
	tasks;

    @ViewChildren(Th2ModalComponent) private modals: QueryList<Th2ModalComponent>;
    private selectedTask;
    private TIME_PATTERN: string = '^[0-9]+(d|h|m){1}(\\s+[0-9]+(d|h|m){1})*$';

	constructor(
		private combosService: CombosService,
		@Inject(FormBuilder) private formBuilder: FormBuilder,
		private tasksService: TasksService) {
		this.filterForm = formBuilder.group({
			code: '',
            projectCd: ''
		});

		this.taskForm = formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			duration: ['', [Validators.required, Validators.pattern(this.TIME_PATTERN)]],
			description: ['', [Validators.required, Validators.minLength(5)]],
            projectCode: ['', [Validators.required]]
		});

		const currentDate = moment().format('DD/MM/YYYY');
		this.timeForm = formBuilder.group({
			time: ['', [Validators.required, Validators.pattern(this.TIME_PATTERN)]],
			date: [currentDate, Validators.required],
			detail: ['', Validators.required]
		});

		this.linkForm = formBuilder.group({
			code: ['', Validators.required]
		});
	}
	
	ngOnInit() {
		this.loadProjects();
		this.filter({});
	}

    selectTask(taskId) {
		this.selectedTask = taskId;
	}

	loadProjects() {
		this.combosService.getProjects().subscribe(
			(projects) => {
                this.projects.push({ code: '', description: 'Choose a project...' });
                this.projects = this.projects.concat(projects);
			},
			(error) => {
                console.error(' Error while retrieving tasks ' + JSON.stringify(error));
			}
		);
	}

	filter(filter) {
        this.tasksService.getTasks(filter.code, filter.projectCd).subscribe(
            (tasks) => {
                this.tasks = tasks;
            },
            (error) => {
                console.error(' Error while retrieving tasks ' + JSON.stringify(error));
            }
        );
	}

	resetFilter() {
        this.filterForm.reset();
        this.filter({});
	}

	createTask(task) {
		task.duration = stringToMinutes(task.duration);
		console.log(JSON.stringify(task));
		this.tasksService.createTask(task).subscribe(
			(result) => {
                this.closeModal('createTaskModal');
				this.filter(this.filterForm.value);
			},
			(error) => {
                console.error(' Error while creating task ' + JSON.stringify(error));
			}
		);
	}

	closeTask() {
        this.tasksService.closeTask(this.selectedTask).subscribe(
            (response) => {
                // TODO: Success toast
                this.filter(this.filterForm.value);
            },
            (error) => {
                console.log(` Error: ${JSON.stringify(error)} `);
            }
        );
	}

	logWork(loggedWork) {
		const loggedTime = stringToMinutes(loggedWork.time);

		loggedWork.time = loggedTime;
		this.tasksService.logWork(this.selectedTask, loggedWork).subscribe(
			(result) => {
                this.closeModal('logWorkModal');
                this.filter(this.filterForm.value);
                // TODO: Success toast
			},
			(error) => {
                console.log(` Error: ${JSON.stringify(error)} `);
			}
		);
	}

	link(linkedTask) {
		this.tasksService.linkTasks(this.selectedTask, linkedTask).subscribe(
            (result) => {
            	this.closeModal('linkTaskModal');
                this.filter(this.filterForm.value);
                // TODO: Success toast
            },
            (error) => {
                console.log(` Error: ${JSON.stringify(error)} `);
            }
        );
	}

	private closeModal(modalName: string) {
        const modal = this.modals.find((modal) => modal.modalId === modalName);
        modal.dismiss();
	}
}
