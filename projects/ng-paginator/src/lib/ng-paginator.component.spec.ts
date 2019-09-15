import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPaginatorComponent } from './ng-paginator.component';

describe('NgPaginatorComponent', () => {
  let component: NgPaginatorComponent;
  let fixture: ComponentFixture<NgPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return true', () => {
    component.activePage = 1;
    component.buildActivePages(0);
    expect(component.activePageNumbers).toEqual([1, 2, 3]);
  });
  it('should set activePageNumbers', () => {
    component.activePage = null;
    component.buildActivePages(4);
    expect(component.activePageNumbers).toEqual([4, 5, 6]);
  });
  it('loadData should return activePage and NoOfRecords', () => {
    spyOn(component.paginatorEvent, 'emit').and.returnValue();
    component.loadData(2);
    expect(component.activePage).toEqual(2);
    expect(component.activePageNumbers).toEqual([1, 2, 3]);
  });
  it('changeNoOfRecords should return activePage and NoOfRecords', () => {
    spyOn(component.paginatorEvent, 'emit').and.returnValue();
    component.activePage = 1;
    component.prevNoOfRecords = 20;
    component.recordsCount = 100;
    component.changeNoOfRecords(10);
    expect(component.noOfRecords).toEqual(10);
    expect(component.pages.length).toEqual(10);
    expect(component.activePageNumbers).toEqual([1, 2, 3]);
    expect(component.activePage).toEqual(1);
  });
});
