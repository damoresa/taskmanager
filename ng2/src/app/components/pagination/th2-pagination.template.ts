export const TH2_PAGINATION_TEMPLATE = `
<div class="th2-pagination row justify-content-center">
    <p class="th2-pagination-element form-control-static"> <b>{{ currentPage }}</b> / <b>{{ noPages }}</b></p>
    <button type="button" class="th2-pagination-element btn btn-outline-primary" (click)="firstPage()">{{ firstPageLabel }}</button>
    <button type="button" class="th2-pagination-element btn btn-outline-info" (click)="previousPage()">{{ previousPageLabel }}</button>
    <button type="button" class="th2-pagination-element btn btn-outline-info" (click)="nextPage()">{{ nextPageLabel }}</button>
    <button type="button" class="th2-pagination-element btn btn-outline-primary" (click)="lastPage()">{{ lastPageLabel }}</button>
    <input type="number" class="th2-pagination-element form-control col-md-2" #pageNumberInput/>
    <button type="button" class="th2-pagination-element btn"
            [ngClass]="{ 'btn-outline-primary' : pageNumberInput.value <= noPages,
                        'btn-outline-danger' : pageNumberInput.value > noPages }"
            (click)="goToPage(pageNumberInput.value)">
        {{ goToLabel }}</button>
</div>`;