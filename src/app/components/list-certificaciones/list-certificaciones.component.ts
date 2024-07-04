import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificacionService } from '../../services/certificacion.service';
import { Certificacion } from '../../models/certificacion.model';
import { CertificacionSummary } from '../../models/certificacionsummary.model';

@Component({
  selector: 'app-list-certificaciones',
  templateUrl: './list-certificaciones.component.html',
  styleUrls: ['./list-certificaciones.component.css'],
})
export class ListCertificacionesComponent implements OnInit {
  certificaciones: Certificacion[] = [];
  certificacionSummary: CertificacionSummary = {
    cantidad: 0,
    precioTotal: 0,
    certificadoMasUsado1: '',
    cantidadCertificadoMasUsado1: 0,
    certificadoMasUsado2: '',
    cantidadCertificadoMasUsado2: 0,
  }; // Inicialización predeterminada
  addCertificacionForm: FormGroup;
  showAddForm = false;
  userId: number;

  constructor(
    private certificacionService: CertificacionService,
    private fb: FormBuilder
  ) {
    this.addCertificacionForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadCertifications();
    this.loadCertificationsSummary();
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

  loadCertificationsSummary(): void {
    this.certificacionService.getCertificationsSummaryByUser().subscribe(
      (summary) => {
        this.certificacionSummary = summary;
      },
      (error) => {
        console.error('Error fetching certification summary', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addCertificacionForm.valid) {
      const userId = Number(localStorage.getItem('userId'));
      const newCertificacion: Certificacion = {
        ...this.addCertificacionForm.value,
        userId: userId,
      };

      this.certificacionService.addCertificacion(newCertificacion).subscribe(
        (response) => {
          this.certificaciones.push(response);
          this.showAddForm = false;
          this.addCertificacionForm.reset();
          this.loadCertificationsSummary(); // Update summary after adding a new certification
        },
        (error) => {
          console.error('Error adding certification', error);
        }
      );
    }
  }
}
