import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY, timer } from 'rxjs';
import { take, switchMap, timeout } from 'rxjs/operators';
import { WeatherService } from './services/weather.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherListResolver implements Resolve<any> {

  constructor(private weatherServise: WeatherService, private route: Router) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<any> | Observable<never> {

    return this.weatherServise.weatherArray$.pipe(
      take(1),
      switchMap(selectedWeatherList => {

        if (selectedWeatherList) {
          return of({
            list: selectedWeatherList.list[route.paramMap.get('day')],
            city: selectedWeatherList.city,
            dayMaxAndMinTemp: selectedWeatherList.dayMaxAndMinTemp,
            dayMaxAndMinHum: selectedWeatherList.dayMaxAndMinHum,
          });
        }

        else {
          console.log('else');
          this.route.navigate(['../']);
          return EMPTY;
        }
      })
    );
  }
}
