import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-box-item',
  templateUrl: './weather-box-item.component.html',
  styleUrls: ['./weather-box-item.component.scss'],
  // tslint:disable-next-line: use-input-property-decorator
  inputs: ['weatherDayItem: weatherData', 'city', 'activeItem', 'maxAndMinTemps:maxMinTemp','maxMinHum'],
})
export class WeatherBoxItemComponent implements OnInit {

  weatherDayItem: object[];
  city: object;
  activeItem: any;
  selectedIndex = 3;
  maxAndMinTemps: object[];
  maxMinHum: object[];

  constructor(private acRoute: ActivatedRoute) { }

  ngOnInit() {
 
    this.acRoute.paramMap.subscribe(params => this.activeItem = +params.get('selectedItem'));
  }

}
