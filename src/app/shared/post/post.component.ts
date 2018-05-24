import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  
  ngOnInit(): void {
  
  }

}
