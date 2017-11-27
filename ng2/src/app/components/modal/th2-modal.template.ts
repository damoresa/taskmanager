export const TH2_MODAL_TEMPLATE = `
<div class="modal fade" id="{{ modalId }}" tabindex="-1" role="dialog" [attr.aria-labelledby]=" modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 80%">
        <div class="modal-content">
            <div class="modal-header">
                <ng-content select=".th2-modal-header"></ng-content>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <ng-content select=".th2-modal-body"></ng-content>
            </div>
            <div class="modal-footer">
                <ng-content select=".th2-modal-footer"></ng-content>
            </div>
        </div>
    </div>
</div>`;
