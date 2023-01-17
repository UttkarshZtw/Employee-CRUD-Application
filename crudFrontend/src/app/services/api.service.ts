import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>(environment.domain, data);
  }

  getEmployee(search: any, page: number = 1, limit: number = 5) {
    return this.http.get<any>(
      `${environment.domain}employee/search?filter=` +
        search +
        `&page=${page}&limit=${limit}`
    );
  }

  putEmployee(data: any, id: number) {
    return this.http.put<any>(`${environment.domain}` + id, data);
  }
  deteteEmployee(id: number) {
    return this.http.delete<any>(`${environment.domain}` + id);
  }

  getParticularEmployee(id: any) {
    return this.http.get<any>(`${environment.domain}` + id);
  }

  getEmployeeId() {
    return this.http.get<any>(`${environment.domain}count/update`);
  }

  softDelete(id: any) {
    return this.http.get<any>(`${environment.domain}employee/delete/` + id);
  }

  fileUpload(imageData: FormData) {
    return this.http.post<any>(environment.imageServiceDomain, imageData);
  }
}
