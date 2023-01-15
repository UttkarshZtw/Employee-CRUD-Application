import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  private _employeeId: any;
  employeeData: any;
  sanitizedImageUrl!: SafeUrl;
  public notLoaded: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this._employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.api.getParticularEmployee(this._employeeId).subscribe({
      next: (res) => {
        this.employeeData = res.getEmployee;
        // const imageUrl = this.employeeData.photo;
        this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(
          this.employeeData.photo
        );
        console.log(this.sanitizedImageUrl);
        this.notLoaded = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
