import { Th2GridAction } from './th2-grid-action';

/**
 * Model class that represents a grid column format.
 */
export class Th2GridColumn {

    /**
     * Default constructor that populates the column model.
     *
     * @param columnDescription Description to be displayed on the column.
     * @param columnKey JSON object key which will be displayed on the column.
     * @param columnOrder JSON object key which the column will be ordered for.
     * @param columnClass CSS class to be set on the column.
     * @param columnActions Actions to be displayed on the column.
     */
    constructor(
        public columnDescription: string,
        public columnKey: string,
        public columnOrder: string,
        public columnClass: string,
        public columnActions: Array<Th2GridAction>
    ) { }
}
