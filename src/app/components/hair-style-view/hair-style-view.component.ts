import { Component } from '@angular/core';
import {HairStyleModel} from '../../Models/HairStyleModel';
import {HairStyleService} from '../../services/hair-style-service.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hair-style-view',
  imports: [
    FormsModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './hair-style-view.component.html',
  styleUrl: './hair-style-view.component.scss'
})
export class HairStyleViewComponent {
  hairStyles: HairStyleModel[] = [];
  currentHairStyle: HairStyleModel = new HairStyleModel();
  isEditMode = false;
  hairTypes: string[] = ['Curly', 'Straight', 'Wavy']; // Example hair types
  hairStyle: any;

  constructor(private hairStyleService: HairStyleService, private router: Router) {}

  ngOnInit(): void {
    this.loadHairStyles();
  }

  loadHairStyles(): void {
    this.hairStyleService.getAll().subscribe(
      (data) => (this.hairStyles = data),
      (error) => console.error('Failed to load hair styles:', error)
    );
  }

  openCreateModal(): void {
    this.currentHairStyle = new HairStyleModel();
    this.isEditMode = false;
    this.openModal();
  }

  openEditModal(hairStyle: HairStyleModel): void {
    this.currentHairStyle = { ...hairStyle };
    this.isEditMode = true;
    this.openModal();
  }

  viewHairStyle(id: string): void {
    this.router.navigate([`/hair-styles/view/${id}`]);
  }

  openModal(): void {
    const modal = document.getElementById('hairStyleModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  closeModal(): void {
    const modal = document.getElementById('hairStyleModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
  }

  saveHairStyle(): void {
    const request = this.isEditMode
      ? this.hairStyleService.update(this.currentHairStyle.id, this.currentHairStyle)
      : this.hairStyleService.create(this.currentHairStyle);

    request.subscribe(
      () => {
        this.loadHairStyles();
        this.closeModal();
      },
      (error) => console.error('Failed to save hair style:', error)
    );
  }

  deleteHairStyle(id: string): void {
    this.hairStyleService.delete(id).subscribe(
      () => this.loadHairStyles(),
      (error) => console.error('Failed to delete hair style:', error)
    );
  }
}
