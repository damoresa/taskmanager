/**
 * Model class that represents a grid action.
 */
export class Th2GridAction {

    /**
     * Default constructor that populates the column model.
     *
     * @param actionId code that identifies the action.
     * @param actionText text to be displayed.
     * @param actionClass class to be set for the action.
     */
    constructor(
        public actionId: string,
        public actionText: string,
        public actionClass: string
    ) { }
}
