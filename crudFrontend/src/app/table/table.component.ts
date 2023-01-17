import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDailogComponent } from '../confirmation-dailog/confirmation-dailog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { NumberedPagination } from '../interfaces';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  employeeProfile: any;
  currentPage: number = 1;
  disableForward: boolean = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'dateOfBirth',
    'salary',
    'skills',
    'action',
  ];

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    private _toast: NgToastService
  ) {}
  dialogRef!: MatDialogRef<ConfirmationDailogComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllEmployees('');
  }

  backPage() {
    this.currentPage -= 1;
    if (this.currentPage == 0) this.currentPage = 1;
    console.log(this.currentPage);
    this.getAllEmployees('', this.currentPage);
  }
  nextPage() {
    this.currentPage += 1;
    this.getAllEmployees('', this.currentPage);
    console.log(this.currentPage);
  }
  // ----------
  getAllEmployees(search: String = '', page: number = 1, limit: number = 5) {
    this.api.getEmployee(search, page, limit).subscribe({
      next: (res) => {
        if (res.getEmployees.length < limit) {
          this.disableForward = true;
        } else this.disableForward = false;
        this.dataSource = new MatTableDataSource(res.getEmployees);
        this.dataSource.sort = this.sort;
        console.log('data source', this.dataSource);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const search = filterValue.trim().toLowerCase();
    const data = this.getAllEmployees(search);
  }

  editEmployee(data: any) {
    console.log(data);
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllEmployees('');
        }
      });
  }

  deleteConfirmation(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: number
  ) {
    this.dialogRef = this.dialog.open(ConfirmationDailogComponent, {
      disableClose: false,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('deleted employee');
        this.deleteEmployee(id);
        this.dialogRef.close();
      }
    });
  }

  deleteEmployee(id: number) {
    this.api.deteteEmployee(id).subscribe({
      next: (res) => {
        this._toast.success({
          detail: 'Sucess Message',
          summary: 'Employee deleted sucessfully !',
          duration: 2000,
        });
        this.getAllEmployees('');
      },
      error: (err) => {
        alert('Error deleting Employee !');
        console.error(err);
      },
    });
  }
  openProfile(id: any) {
    // console.log(id);
    this.employeeProfile = id;
    this._router.navigate([`profile/${id}`]);
  }
}
