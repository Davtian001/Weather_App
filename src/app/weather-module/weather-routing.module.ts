import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherMainComponent } from './components/weather-main/weather-main.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { WeatherListResolver } from './weather-detail-resolver';

const routes: Routes = [
    {path: 'weather', component: WeatherMainComponent,  data: { animation: 'weather'}, children: [

        {path: 'details/:day', resolve: { weatherList: WeatherListResolver }, 
        data: { animation: 'details'},
        component: WeatherDetailComponent,
      }

    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
