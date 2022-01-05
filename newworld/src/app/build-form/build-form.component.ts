import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ability } from '../ability';
import { Build } from '../build';
import { BuildForm } from '../build-form';
import { BuildOverviewService } from '../build-overview.service';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-build-form',
  templateUrl: './build-form.component.html',
  styleUrls: ['./build-form.component.scss']
})
export class BuildFormComponent implements OnInit {

  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = "";

  tags: string[]= ["PVE","PVP","GENERAL","WAR"];
  primaryWeapon: string = "";
  secondaryWeapon: string = "";
  name: string = "";
  username: string = "";
  tag: string = "";
  strength: number = 0;
  dexterity: number = 0;
  intelligence: number = 0;
  focus: number = 0;
  constitution: number = 0;
  primaryAbilities: Ability[] = [];
  secondaryAbilities: Ability[] = [];

  primaryWeaponObject: Weapon = {id:0, name:"", description:"", imageUrl:"", abilities: []};
  secondaryWeaponObject: Weapon = {id:0, name:"", description:"", imageUrl:"", abilities: []};
  categoryPWName1: string = "";
  categoryPWName2: string = "";
  categoryPWAbilities1: Ability[] = [];
  categoryPWAbilities2: Ability[] = [];
  categorySWName1: string = "";
  categorySWName2: string = "";
  categorySWAbilities1: Ability[] = [];
  categorySWAbilities2: Ability[] = [];
  selectedAbilities1: number[] = [];
  selectedAbilities2: number[] = [];

  weapons$ : Observable<Weapon[]> = new Observable();

  build: Build = {id: "", name:"", username:"", tag:"", primaryWeaponName: "", secondaryWeaponName: ""};
  buildForm: BuildForm = {name:"", username:"", tag:"", primaryWeaponName: "", secondaryWeaponName: "", selectedAbilitiesWeapon1: [], selectedAbilitiesWeapon2: [], attributes: []};

  build$: Subscription = new Subscription;
  postBuild$: Subscription = new Subscription;
  putBuild$: Subscription = new Subscription;

  constructor(private buildOverviewService: BuildOverviewService, private weaponService: WeaponService, private router: Router) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.name = this.router.getCurrentNavigation()?.extras.state?.name;

    if(this.name != null) {
      this.build$ = this.buildOverviewService.getBuildByNameForm(this.name).subscribe(result => {
        this.build = result;

      });
    }
  }

  ngOnInit(): void {
    this.weapons$ = this.weaponService.getWeapons();
  }

  selectAbilitiesPW(event: any, id: number) {
    if(this.selectedAbilities1.length == 3) {
      this.errorMessage = "You already selected 3 abilities for your primary weapon.";
      let checkbox = event.target;
      console.log(checkbox);

      if(checkbox.get)
      checkbox.click();
    }

    if(this.selectedAbilities1.length < 3) {
      this.selectedAbilities1.push(id);
    }

    console.log(this.selectedAbilities1);
    console.log(this.errorMessage);
  }

  onChangePrimaryWeapon() {
    this.weaponService.getWeaponByName(this.primaryWeapon).subscribe(result => {
      this.primaryWeaponObject = result;
      this.seperateCategories();
    });
  }

  onChangeSecondaryWeapon() {
    this.weaponService.getWeaponByName(this.secondaryWeapon).subscribe(result => {
      this.secondaryWeaponObject = result;
      this.seperateCategories();
    });
  }

  // getPrimaryAbilities() {
  //   this.weaponService.getWeaponByName(this.primaryWeapon).subscribe(result => {
  //     let weapon: Weapon = result;
  //     this.primaryAbilities = weapon.abilities;
  //   });
  //   this.seperateCategories();
  // }

  // getSecondaryAbilities() {
  //   this.weaponService.getWeaponByName(this.secondaryWeapon).subscribe(result => {
  //     let weapon: Weapon = result;
  //     this.secondaryAbilities = weapon.abilities;
  //   });
  //   this.seperateCategories();
  // }

  ngOnDestroy() {
    this.build$.unsubscribe();
    this.postBuild$.unsubscribe();
    this.putBuild$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;

    let attributes: number[] = [];
    attributes.push(this.strength);
    attributes.push(this.dexterity);
    attributes.push(this.intelligence);
    attributes.push(this.focus);
    attributes.push(this.constitution);

    if(this.isAdd) {
      this.postBuild$ = this.buildOverviewService.createBuild(this.build).subscribe(result => {
        this.router.navigateByUrl("");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    if(this.isEdit) {
      this.putBuild$ = this.buildOverviewService.putBuild(this.build, this.name).subscribe(result => {
        this.router.navigateByUrl("");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

  seperateCategories() {
    this.categoryPWName1 = "";
    this.categoryPWName2 = "";
    this.categorySWName1 = "";
    this.categorySWName2 = "";
    this.categoryPWAbilities1 = [];
    this.categoryPWAbilities2 = [];
    this.categorySWAbilities1 = [];
    this.categorySWAbilities2 = [];

    for(let ability of this.primaryWeaponObject.abilities) {
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

    for(let ability of this.secondaryWeaponObject.abilities) {
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
