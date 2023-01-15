import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { dateValidator, salaryValidator } from './customValidators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  imageData: any = {
    uploadUrl: '',
    data: null,
  };
  data!: FormData;
  skills = new FormControl();
  actionBtn: string = 'Save';
  productForm!: FormGroup;
  srcResult: any;
  lastPreviewImage: any;
  latestSelected: boolean = true;
  today: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      employeeId: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      photo: ['', Validators.required],
      salary: ['', [Validators.required, salaryValidator()]],
      skills: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      console.log(this.editData);
      this.lastPreviewImage = this.editData.photo;
      this.productForm.controls['photo'].setValue(this.editData.photo);
      this.productForm.controls['employeeId'].setValue(
        this.editData.employeeId
      );
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['salary'].setValue(this.editData.salary);
      this.productForm.controls['skills'].setValue(this.editData.skills);
      this.productForm.controls['dateOfBirth'].setValue(
        this.editData.dateOfBirth
      );
    }
  }
  skillLists = [
    'Frontend',
    'Backend',
    'Quality Assurance',
    'Analytics',
    'Product',
    'UI/UX',
  ];
  selectedSkills: any;

  // Image uplaod section
  onFileSelected(event: any) {
    this.latestSelected = false;
    console.log(event);
    const image = event.target.files[0];
    const url = 'https://api.cloudinary.com/v1_1/dmftb38mw/image/upload';
    // event.target.files[0];
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'crudapp');
    this.data = data;
    this.imageData = {
      data: data,
      uploadUrl: url,
    };

    fetch(url, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data.url);
        this.productForm.controls['photo'].setValue(data.url);
        // data.url : contains image url
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addEmployee() {
    if (!this.editData) {
      // console.log(this.productForm.value);
      if (this.productForm.valid) {
        this.api.getEmployeeId().subscribe({
          next: (res) => {
            console.log(res);
            this.productForm.controls['employeeId'].setValue(res.data);
            this.api.fileUpload(this.data).subscribe((data) => {
              console.log(data);
              // console.log(re)
            });
            this.api.postEmployee(this.productForm.value).subscribe({
              next: (res) => {
                alert('Employee added Sucessfully!');
                this.productForm.reset();
                this.dialogRef.close('save');
              },
              error: () => {
                alert('Employee addition faliure !');
              },
            });
          },
        });
        console.log(this.productForm.value);
        // this.api.fileUpload(this.data).subscribe((data) => {
        //   console.log(data);
        //   // console.log(re)
        // });
        // this.api.postEmployee(this.productForm.value).subscribe({
        //   next: (res) => {
        //     alert('Employee added Sucessfully!');
        //     this.productForm.reset();
        //     this.dialogRef.close('save');
        //   },
        //   error: () => {
        //     alert('Employee addition faliure !');
        //   },
        // });
      }
    } else {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    this.api.putEmployee(this.productForm.value, this.editData._id).subscribe({
      next: (res) => {
        alert('Product Updated');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Error while updating the data !');
        console.log(err);
      },
    });
  }
}
