import { Ability } from "./ability";

export interface Weapon {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  abilities: Ability[];
}
