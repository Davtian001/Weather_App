import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
// import { ObservableLike } from 'rxjs';
const WEATHER_URL: string = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const API_KEY: string = 'c43bfb8f4335efe4e1714dd01126b645';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherArray$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }
  // http://api.openweathermap.org/data/2.5/weather?q=Yerevan&APPID=



  /**
   * 
   * @param url default 'http://api.openweathermap.org/data/2.5/forecast?q='
   * @param city default 'Yerevan'
   * @param apiKey default *** 
   */

  private getWeather(url: string = WEATHER_URL, city: string = 'Yerevan', apiKey: string = API_KEY): Observable<any> {
    return this.http.get(`${url}${city}&APPID=${apiKey}`)
      .pipe(
        map((data: { list: object[] }) => {
          // console.log("TCL: WeatherService -> constructor -> data", data)

          data.list.map((weatherDataItem: { weather: { icon: string }[] }) => {

            const currentIcon = weatherDataItem.weather[0].icon;
            weatherDataItem.weather[0].icon = this.decodeWeatherImg(currentIcon);
            return weatherDataItem;
          })

          return data;
        })
      )
  }


  /**
   * 
   * @param piecesCount set interval 
   * @returns days pieces array ...with interval time
   */

  toDivideWithDays<T>(piecesCount: number = 3): Observable<any> {
    piecesCount = 24 / piecesCount;

    return this.getWeather().pipe(
      map(weathetData => {
        // console.log("TCL: weathetData", weathetData)

        let weatherDataPieces: object[] = [];
        let dayIntervalDinamicArray: object[] = [];

        weathetData.list.forEach(item => {

          if (dayIntervalDinamicArray.length < piecesCount - 1) {
            dayIntervalDinamicArray.push(item);

          } else {
            dayIntervalDinamicArray.push(item); // vor ckorcnenq element@
            weatherDataPieces.push(dayIntervalDinamicArray);
            dayIntervalDinamicArray = [];
          }
        });
        weathetData.list = weatherDataPieces;
        weatherDataPieces = []; // clean memory
        
        const midifedData = this.getMaxandMinTempDay(weathetData);
        this.weatherArray$.next(weathetData);
        return midifedData;
      })
    );
  }

  /**
   * 
   * @param weathetData 
   * @description get Min and Max temps of day
   */

  private getMaxandMinTempDay(weathetData) {
    let dayMaxTemp = 0;
    let dayMinTemp = Infinity;
    let dayMaxHumidity = 0;
    let dayMinHumidity = Infinity;

    let dayWeatherItemIndex = 0;
    weathetData.dayMaxAndMinTemp = [];
    weathetData.dayMaxAndMinHum = [];

    weathetData.list.forEach((dayWeatherItem, ind, array) => {
      dayWeatherItemIndex = ind;


      dayWeatherItem.forEach(dataItem => {
        if (dataItem.main.temp > dayMaxTemp) { dayMaxTemp = dataItem.main.temp; }

        if (dayMinTemp > dataItem.main.temp) { dayMinTemp = dataItem.main.temp; }

        if(dataItem.main.humidity > dayMaxHumidity) { dayMaxHumidity = dataItem.main.humidity; }
        if(dayMinHumidity > dataItem.main.humidity) { dayMinHumidity = dataItem.main.humidity; }
      });

      weathetData.dayMaxAndMinTemp.push({ dayMax: dayMaxTemp, dayMin: dayMinTemp });
      weathetData.dayMaxAndMinHum.push({ dayMax: dayMaxHumidity, dayMin: dayMinHumidity })
    });
    return weathetData;
  }

  /**
  *
  * @param imgCode 
  * @param url 
  * @description decode current weather icon 04n > 'http://openweathermap.org/img/w/04n.png'
  */
  private decodeWeatherImg(imgCode: string, url: string = 'http://openweathermap.org/img/w'): string {
    return `${url}/${imgCode}.png`;
  }


  // public getCurrentWeather(url = 'http://api.openweathermap.org/data/2.5/weather?q=Yerevan&APPID=', key: string = API_KEY) {
  //   this.decodeWeatherImg('11n')
  //   return this.http.get(`${url}${key}`).pipe(

  //     map(weatherData => {
  //       const currentIcon = weatherData['weather'][0].icon;
  //       weatherData['weather'][0].icon = this.decodeWeatherImg(currentIcon);
  //       console.log(weatherData['weather'][0].icon);
  //       return weatherData;
  //     }))
  // }

} 