import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  @Input() imageURL: string = "https://d2yxjugd6jl4bj.cloudfront.net/wp-content/uploads/2014/07/08232354/just-do-it-300x300.jpg";
  @Input() height: number = 300;
  @Input() adLink: string = "https://www.nike.com/us/en_us/";

  constructor() { }

  ngOnInit(): void { }
}
