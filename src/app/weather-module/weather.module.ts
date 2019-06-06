import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherMainComponent } from './components/weather-main/weather-main.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherBoxItemComponent } from './components/weather-box-item/weather-box-item.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { ScalePipe } from './pipes/scale.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertPipe } from './pipes/convert.pipe';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    WeatherMainComponent,
    WeatherBoxItemComponent,
    WeatherDetailComponent,
    ScalePipe,
    ConvertPipe,
    GraphicComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ChartsModule,
    WeatherRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
})
export class WeatherModule { }

// https://github.com/facebook/create-react-app