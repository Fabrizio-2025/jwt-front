import { User } from './user.model';

export interface Certificacion {
  id: number;
  nombre: string;
  fecha: Date;
  tipo: string;
  precio: number;
  user: User;
}
