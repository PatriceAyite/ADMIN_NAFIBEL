export interface HairStyleModel {
  id: string; // Peut être optionnel si non requis lors de la création
  name: string;
  description: string;
  hairType: string | number[]; // Permet à hairType d'être soit une chaîne, soit un tableau de nombres
  length: number;
  sex: number; // 1 pour Homme, 2 pour Femme
  averageTime: number;
  maintenanceLevel: number;
  createdBy: string;
  createdOn: string; // Date sous forme de chaîne (ISO 8601)
  modifiedBy?: string; // Optionnel
  modifiedOn?: string; // Optionnel
  isActive: boolean;
}
