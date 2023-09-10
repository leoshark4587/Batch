import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  empForm: FormGroup;
  @Output() refresh=new EventEmitter;
  constructor(  private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _empService: EmployeeService,
    ){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
   }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  update(){
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
            },
          });
      }
  }
}
save(){
  this._empService.addEmployee(this.empForm.value).subscribe({
    next: (val: any) => {
      this._dialogRef.close(true);
    },
  });
}

getEmployeeList() {
  this._empService.getEmployeeList().subscribe((res) =>{
  this._empService=res
  });
}
}
