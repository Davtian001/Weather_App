import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit, OnDestroy {
  destroySeream$ = new Subject<void>();

  weatherData;
  activeItem: number;

  constructor(private weatherService: WeatherService) { }

  selectItem(ind: number): void {
    this.activeItem = ind;
  }


  ngOnInit() {
    this.weatherService.toDivideWithDays().pipe(
      takeUntil(this.destroySeream$))
      .subscribe(data => this.weatherData = data);
  }

  ngOnDestroy(){
    this.destroySeream$.next();
  }

}


  // getCurrentWeather(){
  //   this.weatherService.getCurrentWeather().subscribe(currentWeather =>  this.weatherData = currentWeather);
  // }

