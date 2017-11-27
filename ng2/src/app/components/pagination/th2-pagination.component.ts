import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { TH2_PAGINATION_STYLES } from './th2-pagination.styles';
import { TH2_PAGINATION_TEMPLATE } from './th2-pagination.template';

/**
 * Thin2.0 Pagination component which displays a pagination element which exposes on click callbacks
 * to allow the developer to hook into it's changes.
 */
@Component({
    selector: 'th2-pagination-component',
    template: TH2_PAGINATION_TEMPLATE,
    styles: [ TH2_PAGINATION_STYLES ]
})
export class Th2PaginationComponent implements AfterViewInit {

    /**
     * Input to provide the 'First page' button label.
     */
    @Input() firstPageLabel: string;

    /**
     * Input to provide the 'Previous page' button label.
     */
    @Input() previousPageLabel: string;

    /**
     * Input to provide the 'Go to page' button label.
     */
    @Input() goToLabel: string;

    /**
     * Input to provide the 'Next page' button label.
     */
    @Input() nextPageLabel: string;

    /**
     * Input to provide the 'Last page' button label.
     */
    @Input() lastPageLabel: string;

    /**
     * Input to provide the currently selected page number.
     */
    @Input() currentPage: number;

    /**
     * Input to provide the number of results to be paged.
     */
    @Input() noResults: number;

    /**
     * Input to provide the page size.
     */
    @Input() pageSize: number;

    /**
     * Event emitted when the page number changes.
     * @type {EventEmitter} event emitted when the page number changes.
     */
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();

    /**
     * Number of pages to be generated calculated by the amount of the results
     * and page size.
     */
    noPages: number;

    /**
     * Default component constructor
     */
    constructor() {}

    /**
     * AfterViewInit callback. It calculates the ammount of pages for the
     * given ammount of results and page size.
     */
    ngAfterViewInit() {
        this.noPages = Math.ceil(this.noResults / this.pageSize);
    }

    /**
     * Function invoked when the 'First page' button is clicked.
     */
    firstPage() {
        let firstPage = 1;
        if (firstPage !== this.currentPage) {
            this.pageChanged.emit(firstPage);
        }
    }

    /**
     * Function invoked when the 'Next page' button is clicked.
     */
    nextPage() {
        if (this.currentPage < this.noPages) {
            let next: number = this.currentPage + 1;
            this.pageChanged.emit(next);
        }
    }

    /**
     * Function invoked when the 'Go to page' button is clicked.
     */
    goToPage(noPage: number) {
        if (noPage > 0 && noPage <= this.noPages) {
            this.pageChanged.emit(noPage);
        }
    }

    /**
     * Function invoked when the 'Previous page' button is clicked.
     */
    previousPage() {
        if (this.currentPage > 1) {
            let next: number = this.currentPage - 1;
            this.pageChanged.emit(next);
        }
    }

    /**
     * Function invoked when the 'Last page' button is clicked.
     */
    lastPage() {
        if (this.currentPage !== this.noPages) {
            this.pageChanged.emit(this.noPages);
        }
    }
}
