import { Component, Input } from '@angular/core';

import { TH2_MODAL_TEMPLATE } from './th2-modal.template';

// Dummy variable so that we can compile the usage of jQuery within Typescript
declare const $;

/**
 * Thin2.0 Modal component which renders a modal window transcluding the header, body and footer sections.
 */
@Component({
    selector: 'th2-modal-component',
    template: TH2_MODAL_TEMPLATE
})
export class Th2ModalComponent {

    /**
     * Modal's unique identifier used to open it using Bootstrap 4 controls.
     */
    @Input() modalId: string;

    /**
     * Default constructor
     */
    constructor() {}

    /**
     * Method that closes the modal window programatically.
     */
    dismiss() {
        $('#' + this.modalId).modal('hide');
    }
}
