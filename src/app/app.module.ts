import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-root/app-routing.module';
import { AppComponent } from './app-root/app.component';
import { WeatherModule } from './weather-module/weather.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    WeatherModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
