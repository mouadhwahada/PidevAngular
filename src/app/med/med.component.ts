import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Chart, registerables } from 'chart.js/auto';


@Component({
  selector: 'app-med',
  templateUrl: './med.component.html',
  styleUrls: ['./med.component.css']
})
export class MedComponent {

  chartData: number[];

  constructor(private orderService: OrderService) {
    Chart.register(...registerables); // Register Chart.js plugins
  }

  ngOnInit(): void {
    this.getOrderCounts();
  }

  getOrderCounts(): void {
    const statuses = ['PROCESSING', 'IN_TRANSIT', 'DELIVERED'];
    this.chartData = [];

    statuses.forEach(status => {
      this.orderService.getOrderCountByStatus(status).subscribe(
        count => {
          // Ajouter le compteur au bon index du tableau en fonction de l'état de la commande
          if (status === 'PROCESSING') {
            this.chartData[0] = count;
          } else if (status === 'IN_TRANSIT') {
            this.chartData[1] = count;
          } else if (status === 'DELIVERED') {
            this.chartData[2] = count;
          }

          // Vérifier si toutes les données ont été récupérées avant de rendre le graphique
          if (this.chartData.filter(data => data !== undefined).length === statuses.length) {
            this.renderChart();
          }
        },
        error => {
          console.log('Une erreur s\'est produite lors de la récupération du nombre d\'ordres : ', error);
        }
      );
    });
  }

  renderChart(): void {
    const canvas = document.getElementById('orderChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['PROCESSING', 'IN_TRANSIT', 'DELIVERED'],
        datasets: [{
          label: 'Order Count',
          data: this.chartData,
          backgroundColor: ['#ffcc00', '#0099ff', '#33cc33'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}
