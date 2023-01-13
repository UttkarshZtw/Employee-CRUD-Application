import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dailog',
  templateUrl: './confirmation-dailog.component.html',
  styleUrls: ['./confirmation-dailog.component.css'],
})
export class ConfirmationDailogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDailogComponent>) {}
}
