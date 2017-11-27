/**
 * Model class that represents a callback object.
 */
export class Th2GridCallback {

    /**
     * Default constructor that populates the callback model.
     *
     * @param actionId executed action code to be forwarded to the callback listener.
     * @param row row JSON object on which the action was executed.
     */
    constructor(
        public actionId: string,
        public row: any
    ) { }
}
