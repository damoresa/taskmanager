import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TH2_TOAST_STYLES } from './th2-toast.styles';
import { TH2_TOAST_TEMPLATE } from './th2-toast.template';

/**
 * Thin2.0 Toast component which displays a toast with the given message and visual aspect.
 */
@Component({
    selector: 'th2-toast-component',
    template: TH2_TOAST_TEMPLATE,
    styles: [ TH2_TOAST_STYLES ]
})
export class Th2ToastComponent {
    /**
     * Message to be displayed on the toast.
     */
    @Input() message: string;

    /**
     * Type of the toast to be displayed.
     * Currently supports: error, warning and success.
     */
    @Input() type: string;

    /**
     * Flag that indicates whether the toast is to be displayed
     * or not.
     * @type {boolean} true if the toast is displayed, false otherwise.
     */
    @Input() display: boolean = false;

    /**
     * Event emited when the toast is closed by the user.
     * @type {EventEmitter} event emitted when the user closes the toast.
     */
    @Output() closeEvent: EventEmitter<any> = new EventEmitter();

    /**
     * Component default constructor.
     */
    constructor() {
    }

    /**
     * Method that returns whether the toast type is success or not.
     * @returns {boolean} true if the toast type is success, false otherwise.
     */
    isSuccess() {
        return this.type === 'success';
    }

    /**
     * Method that returns whether the toast type is warning or not.
     * @returns {boolean} true if the toast type is warning, false otherwise.
     */
    isWarning() {
        return this.type === 'warning';
    }

    /**
     * Method that returns whether the toast type is error or not.
     * @returns {boolean} true if the toast type is error, false otherwise.
     */
    isError() {
        return this.type === 'error';
    }

    /**
     * Method that is used to emit close messages when the user clicks
     * the close button.
     */
    close() {
        this.closeEvent.emit();
    }
}