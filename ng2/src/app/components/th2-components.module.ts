import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Th2GridComponent } from './grid/th2-grid.component';
import { Th2ModalComponent } from './modal/th2-modal.component';
import { Th2PaginationComponent } from './pagination/th2-pagination.component';
import { Th2ToastComponent } from './toast/th2-toast.component';

const TH2_COMPONENTS = [
    Th2GridComponent,
    Th2ModalComponent,
    Th2PaginationComponent,
    Th2ToastComponent
];

/**
 * Module that imports and exports all the Thin2.0 graphical components
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TH2_COMPONENTS
    ],
    exports: [
        TH2_COMPONENTS
    ]
})
export class Thin2ComponentsModule {}
