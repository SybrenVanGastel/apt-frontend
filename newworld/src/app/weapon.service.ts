import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from './weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  baseUrl: string = "https://edge-service-server-sybrenvangastel.cloud.okteto.net/";

  constructor(private httpClient: HttpClient) { }

  getWeapons(): Observable<Weapon[]> {
    return this.httpClient.get<Weapon[]>(this.baseUrl + "weapons");
  }

  getWeaponByName(name: string): Observable<Weapon> {
    return this.httpClient.get<Weapon>(this.baseUrl + "weapon/" + name);
  }
}
