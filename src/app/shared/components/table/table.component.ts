import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from './columns';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit{

  @Input()
  tableColumns: Column[]= []
  displayedColumns: string[] = []

  @Input()
  data: T[] = []

  @Output()
  clicked = new EventEmitter<any>()
  
  
  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
  }

  onClicked(item: T){
    console.log(item)
    this.clicked.emit(item)
  }

}
