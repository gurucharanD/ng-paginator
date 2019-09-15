import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-ng-paginator',
  templateUrl: './ng-paginator.component.html',
  styleUrls: ['./ng-paginator.component.css']
})
export class NgPaginatorComponent implements OnInit, OnChanges {
  public pages: Array<number>;
  public activePageNumbers: Array<number>;
  public activePage: number = 1;
  public noOfRecords: number = 50;
  public prevNoOfRecords: number;
  @Input() recordsCount;
  @Output() paginatorEvent = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
  }
  ngOnChanges() {
    if (this.recordsCount) {
      this.activePage = 1;
      this.changeNoOfRecords()
    }
  }

  changeNoOfRecords(rowCount?: number) {
    this.pages = [];
    this.prevNoOfRecords = this.noOfRecords;
    this.noOfRecords = rowCount ? rowCount : this.noOfRecords;
    let length = Math.ceil(this.recordsCount / this.noOfRecords);
    for (let i = 1; i <= length; i++) {
      this.pages.push(i);
    }
    if (this.pages.length <= 3) {
      this.activePageNumbers = this.pages;
    } else {
      this.activePageNumbers = [1, 2, 3]
    }
    if (rowCount) {
      this.activePage = Math.ceil(((((this.activePage - 1) * this.prevNoOfRecords) + 1) / Number(rowCount)));
      this.buildActivePages(this.activePage);
      this.paginatorEvent.emit({
        'activePage': this.activePage,
        'noOfRecords': Number(this.noOfRecords),
        'totalPages': this.pages.length
      });
    }
  }

  loadData(page: number) {
    if (page > 0 && page <= this.pages.length && page !== this.activePage) {
      this.activePage = page;
      const index = this.pages.indexOf(this.activePage);
      this.buildActivePages(index);
      this.paginatorEvent.emit({
        'activePage': this.activePage,
        'noOfRecords': Number(this.noOfRecords),
        'totalPages': this.pages.length
      });
    }
  }

  buildActivePages(index) {
    if (index !== 0) {
      this.activePageNumbers = [];
      if (this.pages[index - 1]) {
        this.activePageNumbers.push(this.pages[index - 1]);
      }
      if (this.pages[index]) {
        this.activePageNumbers.push(this.pages[index]);
      }
      if (this.pages[index + 1]) {
        this.activePageNumbers.push(this.pages[index + 1]);
      }
    }
    if (this.activePage === 1 && this.pages.length > 3) {
      this.activePageNumbers = [1, 2, 3]
    }
    if (this.activePage === this.pages[this.pages.length - 1] && this.pages.length !== 1) {
      this.activePageNumbers = [this.pages[this.pages.length - 3], this.pages[this.pages.length - 2], this.pages[this.pages.length - 1]]
    }
    return;
  }
}