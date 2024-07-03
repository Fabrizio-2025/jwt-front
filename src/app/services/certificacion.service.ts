import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificacion } from '../models/certificacion.model';


@Injectable({
  providedIn: 'root',
})
export class CertificacionService {
  private baseUrl = 'http://localhost:8080/api/certificaciones'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getCertificationsByUser(): Observable<Certificacion[]> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return this.http.get<Certificacion[]>(`${this.baseUrl}/user/${userId}`);
    } else {
      throw new Error('User ID not found in local storage');
    }
  }
}
