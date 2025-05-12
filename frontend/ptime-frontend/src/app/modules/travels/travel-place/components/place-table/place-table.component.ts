import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule }         from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }   from '@angular/material/paginator';
import { MatSort, MatSortModule }             from '@angular/material/sort';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatInputModule }        from '@angular/material/input';   // 👈  pedido
import { MatButtonModule }       from '@angular/material/button';
import { MatIconModule }         from '@angular/material/icon';
import { MatTooltipModule }      from '@angular/material/tooltip';
import { TravelPlaceDto } from '../../services/travel-place-api.service';

@Component({
  selector: 'pt-place-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,      
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],  templateUrl: './place-table.component.html',
  styleUrl: './place-table.component.scss'
})
export class PlaceTableComponent implements OnChanges {
  @Input() places: TravelPlaceDto[] = [];
  @Output() edit   = new EventEmitter<TravelPlaceDto>();
  @Output() remove = new EventEmitter<string>();

    displayedColumns = ['type','name','location','state','notes','actions'];
  dataSource       = new MatTableDataSource<TravelPlaceDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.places;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
