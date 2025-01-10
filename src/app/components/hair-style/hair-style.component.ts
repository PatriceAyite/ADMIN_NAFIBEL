import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HairStyleModel } from '../../Models/HairStyleModel';
import { HairStyleService } from '../../services/hair-style-service.service';
import { ulid } from 'ulid';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hair-style',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule, // Import required Angular Material modules
  ],
  templateUrl: './hair-style.component.html',
  styleUrls: ['./hair-style.component.scss'],
})
export class HairStyleComponent implements OnInit {
  showSuccessAlert = true;
  hairStyles: HairStyleModel[] = [];
  newHairStyle: Partial<HairStyleModel> = {
    hairType: [],
    isActive: true,
  };
  dataSource = new MatTableDataSource<HairStyleModel>(this.hairStyles);
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'hairType',
    'length',
    'sex',
    'averageTime',
    'maintenanceLevel',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private hairStyleService: HairStyleService) {}

  ngOnInit(): void {
    this.loadHairStyles();
  }

  loadHairStyles(): void {
    this.hairStyleService.getAll().subscribe({
      next: (data) => {
        this.hairStyles = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator; // Attach paginator after data is set
      },
      error: (err) => console.error('Erreur lors de la récupération des coiffures :', err),
    });
  }


  addHairStyle(): void {
    const exists = this.hairStyles.some(
      (hs) => hs.name.toLowerCase() === this.newHairStyle.name?.toLowerCase()
    );

    if (exists) {
      alert('Une coiffure avec ce nom existe déjà. Veuillez choisir un autre nom.');
      return;
    }

    if (this.newHairStyle.name && this.newHairStyle.description) {
      if (typeof this.newHairStyle.hairType === 'string') {
        this.newHairStyle.hairType = this.newHairStyle.hairType
          .split(',')
          .map((item) => parseInt(item.trim(), 10));
      }

      if (typeof this.newHairStyle.sex === 'string') {
        this.newHairStyle.sex = parseInt(this.newHairStyle.sex, 10);
      }

      if (
        Array.isArray(this.newHairStyle.hairType) &&
        this.newHairStyle.hairType.every((item) => typeof item === 'number')
      ) {
        this.newHairStyle.id = ulid();
        const now = new Date().toISOString();
        this.newHairStyle.createdOn = now;
        this.newHairStyle.modifiedOn = now;

        this.hairStyleService.create(this.newHairStyle as HairStyleModel).subscribe({
          next: () => {
            this.loadHairStyles();
            this.newHairStyle = { hairType: [], isActive: true };
          },
          error: (err) =>
            console.error('Erreur lors de l’ajout de la coiffure :', err),
        });
      }
    }
  }
}
