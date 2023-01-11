import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:3000/', data);
  }

  getEmployee() {
    return this.http.get<any>('http://localhost:3000/');
  }

  putEmployee(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/' + id, data);
  }
  deteteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:3000/' + id);
  }
}
