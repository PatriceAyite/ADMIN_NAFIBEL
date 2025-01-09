import {Component, NgModule, OnInit} from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@Component({
  selector: 'app-detail-hairstyle',
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './detail-hairstyle.component.html',
  styleUrl: './detail-hairstyle.component.scss'
})
export class DetailHairstyleComponent implements OnInit {
  next() {

  }

  onSubmit() {
    return false;
  }

  ngOnInit() {

  }

}
