import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee_crud';
  mode='table';
  displayedColumns= [
    {field:'id'},
    {field:'firstName'},
    {field:'lastName'},
    // {field:'email'},
    {field:'dob'},
    {field:'gender'},
    // {field:'education'},
    {field:'company'},
    // {field:'experience'},
    // {field:'package'},
    {field:'action'},
  ];
  employeeData:any= [
    {
      "firstName": "Harold",
      "lastName": "Lampkegg",
      "email": "hlampke56@acquirethisname.com",
      "dob": "2000-10-23T10:48:44Z",
      "gender": "Male",
      "education": "Graduate",
      "company": "Browsebug",
      "experience": 50,
      "package": 34,
      "id": 187
    },
    {
      "id": 188,
      "firstName": "Katrina",
      "lastName": "Yurikov",
      "email": "kyurikov57@yandex.ru",
      "dob": "1990-11-07T11:22:21Z",
      "gender": "Female",
      "education": "Graduate",
      "company": "Feednation",
      "experience": 100,
      "package": 24
    },
    {
      "id": 189,
      "firstName": "Rosanna",
      "lastName": "Errol",
      "email": "rerrol58@w3.org",
      "dob": "2001-08-26T04:42:25Z",
      "gender": "Female",
      "education": "Diploma",
      "company": "Blogspan",
      "experience": 25,
      "package": 24
    },
    {
      "id": 190,
      "firstName": "Clarissa",
      "lastName": "Kunat",
      "email": "ckunat59@usa.gov",
      "dob": "2004-05-18T01:28:52Z",
      "gender": "Female",
      "education": "Intermediate",
      "company": "Oyope",
      "experience": 57,
      "package": 23
    },
    {
      "id": 191,
      "firstName": "Sheri",
      "lastName": "Houndson",
      "email": "shoundson5a@nhs.uk",
      "dob": "1981-06-17T09:44:03Z",
      "gender": "Female",
      "education": "Matric",
      "company": "Mycat",
      "experience": 89,
      "package": 21
    },]
  key:any;
  ngOnInit(): void {
    this.getEmployeeList();
  }
  constructor(private router:Router,private _dialog: MatDialog,private empService:EmployeeService){

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getEmployeeList();
        }
      },
    });
  }
  getEmployeeList() {
    this.empService.getEmployeeList().subscribe((res) =>{
    this.employeeData=res
    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditEmployeeComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
}
