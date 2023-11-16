
export class PageInfoVM {
    total: number;
    firstPage: number;
    lastPage: number;
    nextPage: number;
    previousPage: number;
    currentPage: number;
    totalPages: number;
}

export class PageButtonsVM {
    notHasFirstPage: boolean;
    notHasPreviousPage: boolean;
    notHasNextPage: boolean;
    notHasLastPage: boolean;
}

export class PaginatedResponseWithSkipVM {
    data: any[];
    pageInfo: PageInfoVM;
    buttons: PageButtonsVM;

    constructor(skip: number, total: number, data: any[]) {        
        this.data = data;
        this.pageInfo = new PageInfoVM();
        this.buttons = new PageButtonsVM();

        this.pageInfo.firstPage = 1;
        this.pageInfo.lastPage = Math.trunc(Number(total) / 100) + 1;
        this.pageInfo.total = total;
        this.pageInfo.currentPage = skip;
        this.pageInfo.totalPages = Math.trunc(Number(total) / 100) + 1;
        if (skip == 1) {
            this.buttons.notHasFirstPage = true;
            this.buttons.notHasPreviousPage = true;
            this.pageInfo.previousPage = 1;
        } else {
            this.buttons.notHasFirstPage = false;
            this.buttons.notHasPreviousPage = false;
            this.pageInfo.previousPage = Number(skip) - 1;
        }
        if (skip >= this.pageInfo.totalPages) {
            this.buttons.notHasLastPage = true;
            this.buttons.notHasNextPage = true;
            this.pageInfo.nextPage = 0;
        } else {
            this.buttons.notHasLastPage = false;
            this.buttons.notHasNextPage = false;
            this.pageInfo.nextPage = Number(skip) + 1;
        }     
    }
}