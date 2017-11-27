import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Th2GridCallback } from './th2-grid-callback';
import { Th2GridColumn } from './th2-grid-column';

import { TH2_GRID_TEMPLATE } from './th2-grid.template';

/**
 * Thin2.0 Grid component which displays a grid with the given column definition and data set.
 */
@Component({
    selector: 'th2-grid-component',
    template: TH2_GRID_TEMPLATE
})
export class Th2GridComponent {

    /**
     * Columns to be displayed on the grid.
     */
    @Input() columns: Array<Th2GridColumn>;

    /**
     * Data to be displayed on the grid.
     */
    @Input() data: any;

    /**
     * Event emitted when an action is triggered.
     * @type {EventEmitter} event emitted when an action is triggered.
     */
    @Output() actionClicked: EventEmitter<Th2GridCallback> = new EventEmitter();

    /**
     * Component default constructor
     */
    constructor() {

    }

    /**
     * Function called when an action is clicked.
     * @param actionId action identifier
     * @param row row data
     */
    elementClicked(actionId, row) {
        let callbackData: Th2GridCallback = new Th2GridCallback(actionId, row);
        this.actionClicked.emit(callbackData);
    }
}
