import { Component } from '@angular/core';
import { CertificacionService } from '../../services/certificacion.service';
import { Certificacion } from '../../models/certificacion.model';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-certificaciones',
  templateUrl: './list-certificaciones.component.html',
  styleUrl: './list-certificaciones.component.css',
})
export class ListCertificacionesComponent implements OnInit {
  certificaciones: Certificacion[] = [];
  userId!: number;

  constructor(
    private certificacionService: CertificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = 1; // O obtener el userId de alguna manera
    this.loadCertifications();
  }

  loadCertifications(): void {
    this.certificacionService.getCertificationsByUser().subscribe(
      (data) => {
        this.certificaciones = data;
      },
      (error) => {
        console.error('Error fetching certifications', error);
      }
    );
  }
}
