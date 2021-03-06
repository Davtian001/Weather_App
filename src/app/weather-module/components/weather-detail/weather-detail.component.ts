import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit, OnDestroy {
  destroySeream$ = new Subject<void>();

  selectedDayWeather: { city: object, weatherListDay: object[] };
  selectedIndex = 0;
  currentDayNum: number;
  constructor(private acRoute: ActivatedRoute, private weatherService: WeatherService) { }

  select(ind: number) {
    this.selectedIndex = ind;
  }

  ngOnInit() {
    this.acRoute.paramMap.pipe(takeUntil(this.destroySeream$))
    .subscribe(dayNum => {
      this.selectedIndex = 0;
      this.currentDayNum = +dayNum.get('day');
    });

    this.acRoute.data.pipe(takeUntil(this.destroySeream$))
    .subscribe(data => {
      this.selectedDayWeather = data.weatherList;
    });
  }

  ngOnDestroy(){
    this.destroySeream$.next();
  }
}
