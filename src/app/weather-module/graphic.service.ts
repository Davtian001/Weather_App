import { Injectable, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphicService implements OnDestroy {

  destroyStream$ = new Subject<void>()

  constructor(private weatherService: WeatherService) { }




  getGraphic(scale: string, datAarrayName: string, arrayPropName: [string, string]): Promise<number[]> {
    return new Promise(resolve => {

      const graphicArray: number[] = [];

      this.weatherService.weatherArray$.pipe(takeUntil(this.destroyStream$))
        .subscribe(weatherData => {

          if (weatherData) {
            for (let ind = 0; ind < (weatherData[datAarrayName].length - 1) * 2; ind++) {
              if (!weatherData[datAarrayName][ind]) { break; }

              if (scale === 'celcius') {
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[0]] - 273.1).toFixed(1));
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[1]] - 273.1).toFixed(1));

              } else if (scale === 'humidity') {
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[0]]));
                graphicArray.push(+(weatherData[datAarrayName][ind][arrayPropName[1]]));
              }
            }
          }
        });
      resolve(graphicArray);
    })
  }


  ngOnDestroy() {
    this.destroyStream$.next()
  }
}
