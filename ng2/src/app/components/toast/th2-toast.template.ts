export const TH2_TOAST_TEMPLATE = `
<div class="alert alert-dismissible" role="alert"
    [ngClass]="{ 'alert-success' : isSuccess(), 'alert-warning' : isWarning(), 'alert-danger' : isError(), 'show': display }">
    <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
</div>`;
