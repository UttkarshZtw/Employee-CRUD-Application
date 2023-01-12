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

  getParticularEmployee(id: any) {
    return this.http.get<any>('http://localhost:3000/' + id);
  }

  getEmployeeId() {
    return this.http.get<any>('http://localhost:3000/count/update');
  }

  fileUpload(imageData: FormData) {
    const url = 'https://api.cloudinary.com/v1_1/dmftb38mw/image/upload';
    // const payload = {
    //   body: imageData.data,
    // };
    return this.http.post<any>(url, imageData);

    // fetch(imageData.url, {
    //   method: 'post',
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     console.log(typeof data.url);
    //     this.productForm.controls['photo'].setValue(data.url);
    //     // data.url : contains image
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
