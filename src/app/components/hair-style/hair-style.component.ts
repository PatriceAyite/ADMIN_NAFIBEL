import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HairStyleModel } from '../../Models/HairStyleModel';
import { HairStyleService } from '../../services/hair-style-service.service';
import { ulid } from 'ulid'; // Importer ulid

@Component({
  selector: 'app-hair-style',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './hair-style.component.html',
  styleUrls: ['./hair-style.component.scss'],
})
export class HairStyleComponent implements OnInit {
  hairStyles: HairStyleModel[] = [];
  newHairStyle: Partial<HairStyleModel> = {
    hairType: [],
    isActive: true,
  };

  constructor(private hairStyleService: HairStyleService) {}

  ngOnInit(): void {
    this.loadHairStyles();
  }

  loadHairStyles(): void {
    this.hairStyleService.getAll().subscribe({
      next: (data) => (this.hairStyles = data),
      error: (err) => console.error('Erreur lors de la récupération des coiffures :', err),
    });
  }

  addHairStyle(): void {
    // Vérifier si le nom existe déjà
    const exists = this.hairStyles.some(hs => hs.name.toLowerCase() === this.newHairStyle.name?.toLowerCase());

    if (exists) {
      alert('Une coiffure avec ce nom existe déjà. Veuillez choisir un autre nom.');
      return; // Arrêter l'exécution si le nom existe déjà
    }

    if (this.newHairStyle.name && this.newHairStyle.description) {
      if (typeof this.newHairStyle.hairType === 'string') {
        this.newHairStyle.hairType = this.newHairStyle.hairType
          .split(',')
          .map(item => parseInt(item.trim(), 10));
      }

      // Assurez-vous que sex est un nombre
      if (typeof this.newHairStyle.sex === 'string') {
        this.newHairStyle.sex = parseInt(this.newHairStyle.sex, 10);
      }

      if (Array.isArray(this.newHairStyle.hairType) && this.newHairStyle.hairType.every(item => typeof item === 'number')) {
        // Générer un ULID et les dates pour la nouvelle entrée
        this.newHairStyle.id = ulid();
        const now = new Date().toISOString();
        this.newHairStyle.createdOn = now;
        this.newHairStyle.modifiedOn = now;

        console.log('Envoi des données :', this.newHairStyle);

        this.hairStyleService.create(this.newHairStyle as HairStyleModel).subscribe({
          next: () => {
            this.loadHairStyles();
            this.newHairStyle = { hairType: [], isActive: true };
          },
          error: (err) => console.error('Erreur lors de l\'ajout de la coiffure :', err),
        });
      } else {
        console.error('Format hairType invalide');
        alert('Veuillez vous assurer que hairType est une liste valide de numéros.');
      }
    } else {
      alert('Veuillez remplir tous les champs requis!');
    }
  }
}
