import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Build } from './build';
import { BuildDetail } from './build-detail';
import { BuildForm } from './build-form';

@Injectable({
  providedIn: 'root'
})
export class BuildOverviewService {

  baseUrl: string = "https://edge-service-server-sybrenvangastel.cloud.okteto.net/";

  constructor(private httpClient: HttpClient) { }

  getBuilds(): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.baseUrl + "builds");
  }

  getBuildByName(name: string): Observable<BuildDetail> {
    return this.httpClient.get<BuildDetail>(this.baseUrl + "build/" + name);
  }

  // getBuildByNameForm(name: string): Observable<Build> {
  //   return this.httpClient.get<BuildForm>(this.baseUrl + "build/" + name);
  // }

  getBuildsByName(name: string): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.baseUrl + "builds/" + name);
  }

  getBuildsByUsername(username: string): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.baseUrl + "builds/user/" + username);
  }

  getBuildsByWeapon(weapon: string): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.baseUrl + "builds/weapon/" + weapon);
  }

  getBuildsByTag(tag: string): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.baseUrl + "builds/tag/" + tag);
  }

  createBuild(build: BuildForm): Observable<Build> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Build>(this.baseUrl + "build", build, {headers: headers});
  }

  putBuild(build: BuildForm, name: string): Observable<Build> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Build>(this.baseUrl + "build/" + name, build, {headers: headers});
  }

  deleteBuild(name: string): Observable<Build> {
    return this.httpClient.delete<Build>(this.baseUrl + "build/" + name);
  }
}
