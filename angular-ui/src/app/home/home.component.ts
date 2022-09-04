import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title!: string;
  description!: string;
  createdDate!: Date;
  snaps!: number;

  constructor() { }

  ngOnInit(): void {
    this.title = "Soumar";
    this.description = "c'est ma description";
    this.createdDate = new Date();
    this.snaps = 8;
  }

  onAddSnap() {
    this.snaps++;
  }
}