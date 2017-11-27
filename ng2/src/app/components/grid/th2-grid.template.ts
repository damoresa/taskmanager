export const TH2_GRID_TEMPLATE = `
<div class="table-responsive">
    <table class="table">
        <thead class="thead-default">
            <tr class="row m-0">
                <th *ngFor="let column of columns" class="{{ column.columnClass }}">{{ column.columnDescription }}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="row m-0" *ngFor="let element of data">
                <td class="{{ column.columnClass }}" *ngFor="let column of columns">
                    <span *ngIf="column.columnActions">
                        <span *ngFor="let action of column.columnActions" class="{{ action.actionClass }}"
                              (click)="elementClicked(action.actionId, element)" style="cursor: pointer;"
                              [innerHtml]="action.actionText"></span>
                    </span>
                    <span *ngIf="!column.columnActions">
                        {{ element[column.columnKey] }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;