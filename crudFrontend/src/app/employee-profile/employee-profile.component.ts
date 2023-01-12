import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit, OnChanges {
  _employeeId: any;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit(): void {
    this._employeeId = this.route.snapshot.paramMap.get('id');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('this is changes ', changes);
  }
}
