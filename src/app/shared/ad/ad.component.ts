import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements AfterViewInit {

  ngAfterViewInit() {
    try {
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    } catch(e) {
      console.error("error");
    }
 }

}
