import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from '../ability';
import { BuildDetail } from '../build-detail';
import { BuildOverviewService } from '../build-overview.service';

@Component({
  selector: 'app-build-detail',
  templateUrl: './build-detail.component.html',
  styleUrls: ['./build-detail.component.scss']
})
export class BuildDetailComponent implements OnInit {

  build: BuildDetail = {name:"", username:"", tag:"", primaryWeapon: {id:0, name:"", description:"", abilities: [], imageUrl:""},secondaryWeapon:{id:0, name:"", description:"", abilities: [], imageUrl:""}, attributes: {strength:0, dexterity:0, intelligence:0,focus:0,constitution:0}};
  categoryPWName1: string = "";
  categoryPWName2: string = "";
  categoryPWAbilities1: Ability[] = [];
  categoryPWAbilities2: Ability[] = [];
  categorySWName1: string = "";
  categorySWName2: string = "";
  categorySWAbilities1: Ability[] = [];
  categorySWAbilities2: Ability[] = [];

  constructor(private buildOverviewService: BuildOverviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name != null) {
        this.buildOverviewService.getBuildByName(name).subscribe(result => {
          this.build = result;
          this.seperateCategories();
          console.log(this.categoryPWAbilities1);
        });
    }
  }

  seperateCategories() {
    for(let ability of this.build.primaryWeapon.abilities) {
      if (this.categoryPWName1 == "") {
        this.categoryPWName1 = ability.category;
      }
      if (this.categoryPWName1 != "" && ability.category != this.categoryPWName1 && this.categoryPWName2 == "") {
        this.categoryPWName2 = ability.category;
      }

      if(this.categoryPWName1 == ability.category) {
        this.categoryPWAbilities1.push(ability);
      }
      if(this.categoryPWName2 == ability.category) {
        this.categoryPWAbilities2.push(ability);
      }
    }

    for(let ability of this.build.secondaryWeapon.abilities) {
      if (this.categorySWName1 == "") {
        this.categorySWName1 = ability.category;
      }
      if (this.categorySWName1 != "" && ability.category != this.categorySWName1 && this.categorySWName2 == "") {
        this.categorySWName2 = ability.category;
      }

      if(this.categorySWName1 == ability.category) {
        this.categorySWAbilities1.push(ability);
      }
      if(this.categorySWName2 == ability.category) {
        this.categorySWAbilities2.push(ability);
      }
    }
  }

}
