import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }        from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }  from '@angular/material/paginator';
import { MatSort, MatSortModule }            from '@angular/material/sort';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatTooltipModule }    from '@angular/material/tooltip';
import { MatInputModule }      from '@angular/material/input';
import { UserProfileDto } from '../../services/user-profile-api.service';

@Component({
  selector: 'pt-profile-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule          
  ],  templateUrl: './profile-table.component.html',
  styleUrl: './profile-table.component.scss'
})
export class ProfileTableComponent implements OnChanges {
  @Input() profiles: UserProfileDto[] = [];
  @Output() edit   = new EventEmitter<UserProfileDto>();
  @Output() remove = new EventEmitter<string>();
  
  displayedColumns = ['avatar','name','theme','lang','actions'];
  dataSource       = new MatTableDataSource<UserProfileDto>();
  defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=999&color=fff';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.profiles;
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort)      this.dataSource.sort      = this.sort;
  }

  applyFilter(v: string) {
    this.dataSource.filter = v.trim().toLowerCase();
  }
}
