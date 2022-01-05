import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Build } from '../build';
import { BuildOverviewService } from '../build-overview.service';

@Component({
  selector: 'app-build-overview',
  templateUrl: './build-overview.component.html',
  styleUrls: ['./build-overview.component.scss']
})
export class BuildOverviewComponent implements OnInit {

  builds$: Observable<Build[]> = new Observable<Build[]>();
  selectedFilter: number = 0;
  weapons: string[]= ["Bow","FireMagic","GreatAxe","Hatchet","IceMagic","LifeMagic","Musket","Rapier","Spear","Sword","WarHammer"];
  tags: string[]= ["PVE","PVP","GENERAL","WAR"];
  name: string = "";
  username: string = "";
  weapon: string = "";
  tag: string = "";

  constructor(private buildOverviewService: BuildOverviewService, private router: Router) { }

  ngOnInit(): void {
    this.builds$ = this.buildOverviewService.getBuilds();
  }

  onSubmit() {
    console.log(this.name, this.username, this.weapon, this.tag);
    if (this.name != "") {
      this.builds$ = this.buildOverviewService.getBuildsByName(this.name);
    }
    else if (this.username != "") {
      this.builds$ = this.buildOverviewService.getBuildsByUsername(this.username);
    }
    else if (this.weapon != "") {
      this.builds$ = this.buildOverviewService.getBuildsByWeapon(this.weapon);
    }
    else if (this.tag != "") {
      this.builds$ = this.buildOverviewService.getBuildsByTag(this.tag);
    }
    else {
      this.builds$ = this.buildOverviewService.getBuilds();
    }
  }

  clearAll() {
    this.name = "";
    this.username = "";
    this.weapon = "";
    this.tag = "";
  }

  detail(name: string) {
    this.router.navigateByUrl("build/" + name);
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['builds/form'], {state: {mode: 'add'}});
  }

  edit(name: string) {
    //Navigate to form in edit mode
    this.router.navigate(['builds/form'], {state: {mode: 'edit', name: name}});
  }

  delete(name: string) {
    this.buildOverviewService.deleteBuild(name).subscribe(result => {
      this.builds$ = this.buildOverviewService.getBuilds();
    });
  }

}
