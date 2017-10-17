import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '../../shared';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

export interface UserData {
  id: string;
  name: string;
  group: string;
  gender: string;
  age: number
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'name', 'group', 'gender', 'age'];
  userDataBase: UserDataBase | null;
  dataSource: DataSource<UserData> | null;
  constructor(http: Http){
    this.userDataBase = new UserDataBase(http);
    
  }

  filter = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new DataSource(this.userDataBase, this.paginator, this.sort, this.extractData);
  }
  ngAfterViewInit(){}

  extractData(result: Response): UserData[] {
    return result.json().map(user => {
      return {
        id: user.id,
        name: user.name,
        group: user.group,
        gender: user.gender,
        age: user.age
      }
    });
  }
}

//------------------------  Database Mocker-------------------------

export class UserDataBase {
  private userUrl = 'http://localhost:3000/users';  // URL to web API

  getData(params): Observable<Response> {
    return this.http.get(this.userUrl, {params: params}).delay(1000)
  }
  constructor(private http: Http) {}
}
