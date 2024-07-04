import { Component, OnInit } from '@angular/core';
import { CertificacionService } from '../../services/certificacion.service';
import { CertificacionSummary } from '../../models/certificacionsummary.model';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {
  basicData: any = null;
  basicOptions: any;

  constructor(private certificacionService: CertificacionService) {}

  ngOnInit(): void {
    this.loadCertificationSummary();
  }

  loadCertificationSummary(): void {
    this.certificacionService.getCertificationsSummaryByUser().subscribe(
      (summary: CertificacionSummary) => {
        if (
          summary.cantidadCertificadoMasUsado1 > 0 ||
          summary.cantidadCertificadoMasUsado2 > 0
        ) {
          this.basicData = {
            labels: [
              summary.certificadoMasUsado1,
              summary.certificadoMasUsado2,
            ],
            datasets: [
              {
                label: 'Cantidad',
                data: [
                  summary.cantidadCertificadoMasUsado1,
                  summary.cantidadCertificadoMasUsado2,
                ],
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
                borderWidth: 1,
              },
            ],
          };

          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
          );
          const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

          this.basicOptions = {
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false,
                },
              },
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false,
                },
              },
            },
          };
        }
      },
      (error) => {
        console.error('Error fetching certification summary', error);
      }
    );
  }
}
