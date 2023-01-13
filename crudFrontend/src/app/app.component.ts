import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

// for table component
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDailogComponent } from './confirmation-dailog/confirmation-dailog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crudFrontend';
  employeeProfile: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'dateOfBirth',
    'salary',
    'skills',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  dialogRef!: MatDialogRef<ConfirmationDailogComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private _router: Router
  ) {}

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

  editEmployee(data: any) {
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
        alert('Employee deletd sucessfully !');
        this.getAllEmployees();
      },
      error: (err) => {
        alert('Error deleting Employee !');
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

  openProfile(id: any) {
    // console.log(id);
    this.employeeProfile = id;
    this._router.navigate([`profile/${id}`]);
  }
}
