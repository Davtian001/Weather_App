import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  help = false;

  getHelp(){
    this.help = true
    setTimeout(() => this.help = false,1000)
  }
}
