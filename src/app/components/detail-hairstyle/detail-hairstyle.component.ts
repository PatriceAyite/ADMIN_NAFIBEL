import {Component, ElementRef, NgModule, OnInit} from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetailHairStyleServiceService} from '../../services/detail-hair-style-service.service';



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

  constructor(private detailHairStyleServiceService: DetailHairStyleServiceService) {}

  ngOnInit(): void {
  }

  getHairStyleById(id: string): void {
    this.detailHairStyleServiceService.getById(id).subscribe({
      next: (data) => {
        console.log('Détails de la coiffure récupérés :', data);
      },
      error: (err) => console.error('Erreur lors de la récupération de la coiffure :', err),
    });
  }


}
