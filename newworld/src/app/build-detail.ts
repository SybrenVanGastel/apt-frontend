import { Attributes } from "./attributes";
import { Weapon } from "./weapon";

export interface BuildDetail {
  name: string;
  username: string;
  tag: string;
  attributes: Attributes;
  primaryWeapon: Weapon;
  secondaryWeapon: Weapon;
}
