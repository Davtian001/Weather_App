import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../weather.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    .subscribe(dayNum => this.currentDayNum = +dayNum.get('day'))

    this.acRoute.data.pipe(takeUntil(this.destroySeream$))
    .subscribe(data => {
      this.selectedDayWeather = data.weatherList;
    });
    // console.log(this.selectedDayWeather);
  }

  ngOnDestroy(){
    this.destroySeream$.next();
  }
}
