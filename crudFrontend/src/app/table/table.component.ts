import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDailogComponent } from '../confirmation-dailog/confirmation-dailog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  employeeProfile: any;
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
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
          this.getAllEmployees();
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
        this.getAllEmployees();
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
