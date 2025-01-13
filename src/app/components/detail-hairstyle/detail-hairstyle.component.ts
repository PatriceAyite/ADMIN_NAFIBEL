import { Component, OnInit } from '@angular/core';
import { DetailHairStyleServiceService } from '../../services/detail-hair-style-service.service';
import {HairStyleModel} from '../../Models/HairStyleModel';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-detail-hairstyle',
  standalone:true,
  templateUrl: './detail-hairstyle.component.html',
  styleUrls: ['./detail-hairstyle.component.scss'],
  imports: [
    NgIf, NgFor
  ],
  // Votre style SCSS
})
export class DetailHairstyleComponent implements OnInit {
  hairStyles: HairStyleModel[] = [];  // Pour stocker la liste des coiffures
  selectedHairStyle: HairStyleModel | null = null;  // Variable pour la coiffure sélectionnée

  constructor(private detailHairStyleService: DetailHairStyleServiceService) {}

  ngOnInit(): void {
    this.getHairStyles();  // Récupère toutes les coiffures au démarrage
  }

  // Méthode pour récupérer toutes les coiffures
  getHairStyles(): void {
    this.detailHairStyleService.getAll().subscribe({
      next: (data) => {
        this.hairStyles = data;  // Stocke les coiffures récupérées dans la variable
        console.log('Coiffures récupérées :', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des coiffures :', err);
      },
    });
  }

  // Méthode pour afficher les détails de la coiffure sélectionnée
  viewHairStyleDetails(id: string): void {
    this.detailHairStyleService.getById(id).subscribe({
      next: (data) => {
        this.selectedHairStyle = data;  // Met à jour la coiffure sélectionnée
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la coiffure :', err);
      },
    });
  }
}
