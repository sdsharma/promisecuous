import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'peter-test',
  templateUrl: './peter-test.component.html',
  styleUrls: ['./peter-test.component.scss']
})
export class PeterTestComponent implements OnInit {

  @Input() color: string
  @Input() number: number;
  numbers: number[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.number; i++) {
      this.numbers.push(1);
    }
  }

}
