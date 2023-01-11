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
  skills = new FormControl();
  actionBtn: string = 'Save';
  productForm!: FormGroup;
  srcResult: any;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
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
  // console.log(selectedToppings)

  // Image uplaod section
  onFileSelected(event: any) {
    // console.log(event);
  }

  addEmployee() {
    if (!this.editData) {
      console.log(this.productForm.value);
      if (this.productForm.valid) {
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
      }
    } else {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    this.api.putEmployee(this.productForm.value, this.editData.id).subscribe({
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
