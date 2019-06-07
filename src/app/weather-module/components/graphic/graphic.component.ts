import { Component, OnInit } from '@angular/core';
import { GraphicService } from '../../services/graphic.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  weatherData: object[];
  chartData = [];
  chartOptions;
  chartLabels;

  constructor(private graphicService: GraphicService) { }


  onChartClick(event) {
    // console.log(event);
  }

  ngOnInit() {

    this.chartOptions = { responsive: true };
    this.chartLabels = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday'];

    this.graphicService.getGraphic('celcius', 'dayMaxAndMinTemp', ['dayMax', 'dayMin']).then(graphic =>
      this.chartData.push({ data: graphic, label: 'Temperature'}));

    this.graphicService.getGraphic('humidity', 'dayMaxAndMinHum', ['dayMax', 'dayMin']).then(graphic =>
      this.chartData.push({ data: graphic, label: 'Humidity'}));
      }

}
