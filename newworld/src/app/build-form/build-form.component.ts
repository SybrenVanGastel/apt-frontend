import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ability } from '../ability';
import { Build } from '../build';
import { BuildDetail } from '../build-detail';
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
  name: string = "";
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

  attributePointsTotal: number = 0;

  weapons$ : Observable<Weapon[]> = new Observable();

  build: BuildDetail = {name:"", username:"", tag:"",attributes: {strength: 5, dexterity:5,intelligence:5,focus:5,constitution:5}, primaryWeapon: {id:0,name:"",description:"",imageUrl:"",abilities: []}, secondaryWeapon: {id:0,name:"",description:"",imageUrl:"",abilities: []}};
  buildForm: BuildForm = {name:"", username:"", tag:"", primaryWeaponName: "", secondaryWeaponName: "", selectedAbilitiesWeapon1: [], selectedAbilitiesWeapon2: [], attributeOptions: []};

  build$: Subscription = new Subscription;
  postBuild$: Subscription = new Subscription;
  putBuild$: Subscription = new Subscription;

  constructor(private buildOverviewService: BuildOverviewService, private weaponService: WeaponService, private router: Router) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.name = this.router.getCurrentNavigation()?.extras.state?.name;

    if(this.name != null) {
      this.build$ = this.buildOverviewService.getBuildByName(this.name).subscribe(result => {
        this.build = result;

        this.primaryWeaponObject = this.build.primaryWeapon;
        this.secondaryWeaponObject = this.build.secondaryWeapon;
        this.seperateCategories();
      });
    }
  }

  ngOnInit(): void {
    this.weapons$ = this.weaponService.getWeapons();
  }

  selectAbilitiesPW(event: any, id: number) {
    let checkbox = event.target;
    if(!checkbox.checked) {
      var index = this.selectedAbilities1.indexOf(id);
      if (index !== -1) {
        this.selectedAbilities1.splice(index, 1);
      }
    }

    if(this.selectedAbilities1.length == 3) {
      this.errorMessage = "You already selected 3 abilities for your primary weapon.";

      if(checkbox.checked) {
        checkbox.checked = false;
      }
    }

    if(this.selectedAbilities1.length < 3 && checkbox.checked) {
      this.selectedAbilities1.push(id);
    }
  }

  selectAbilitiesSW(event: any, id: number) {
    let checkbox = event.target;
    if(!checkbox.checked) {
      var index = this.selectedAbilities2.indexOf(id);
      if (index !== -1) {
        this.selectedAbilities2.splice(index, 1);
      }
    }

    if(this.selectedAbilities2.length == 3) {
      this.errorMessage = "You already selected 3 abilities for your secondary weapon.";

      if(checkbox.checked) {
        checkbox.checked = false;
      }
    }

    if(this.selectedAbilities2.length < 3 && checkbox.checked) {
      this.selectedAbilities2.push(id);
    }
  }

  onChangePrimaryWeapon() {
    this.weaponService.getWeaponByName(this.build.primaryWeapon.name).subscribe(result => {
      this.primaryWeaponObject = result;
      this.seperateCategories();
    });
  }

  onChangeSecondaryWeapon() {
    this.weaponService.getWeaponByName(this.build.secondaryWeapon.name).subscribe(result => {
      this.secondaryWeaponObject = result;
      this.seperateCategories();
    });
  }

  attributeSlider(type: string) {
    this.attributePointsTotal = this.build.attributes.strength + this.build.attributes.dexterity + this.build.attributes.intelligence + this.build.attributes.focus + this.build.attributes.constitution;

    if(!(this.attributePointsTotal < 215)) {
      this.errorMessage = "You can only spend 190 attribute points.";
      switch(type) {
        case 'strength':
          this.build.attributes.strength = 215 - this.build.attributes.dexterity - this.build.attributes.intelligence - this.build.attributes.focus - this.build.attributes.constitution;
          break;
        case 'dexterity':
          this.build.attributes.dexterity = 215 - this.build.attributes.strength - this.build.attributes.intelligence - this.build.attributes.focus - this.build.attributes.constitution;
          break;
        case 'intelligence':
          this.build.attributes.intelligence = 215 - this.build.attributes.dexterity - this.build.attributes.strength - this.build.attributes.focus - this.build.attributes.constitution;
          break;
        case 'focus':
          this.build.attributes.focus = 215 - this.build.attributes.dexterity - this.build.attributes.intelligence - this.build.attributes.strength - this.build.attributes.constitution;
          break;
        case 'constitution':
          this.build.attributes.constitution = 215 - this.build.attributes.dexterity - this.build.attributes.intelligence - this.build.attributes.focus - this.build.attributes.strength;
          break;
      }
    }
  }

  ngOnDestroy() {
    this.build$.unsubscribe();
    this.postBuild$.unsubscribe();
    this.putBuild$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;

    let attributes: number[] = [];
    attributes.push(this.build.attributes.strength);
    attributes.push(this.build.attributes.dexterity);
    attributes.push(this.build.attributes.intelligence);
    attributes.push(this.build.attributes.focus);
    attributes.push(this.build.attributes.constitution);

    this.buildForm.primaryWeaponName = this.build.primaryWeapon.name;
    this.buildForm.secondaryWeaponName = this.build.secondaryWeapon.name;
    this.buildForm.name = this.build.name;
    this.buildForm.username = this.build.username;
    this.buildForm.tag = this.build.tag;
    this.buildForm.selectedAbilitiesWeapon1 = this.selectedAbilities1;
    this.buildForm.selectedAbilitiesWeapon2 = this.selectedAbilities2;
    this.buildForm.attributeOptions = attributes;

    if(this.isAdd) {
      this.postBuild$ = this.buildOverviewService.createBuild(this.buildForm).subscribe(result => {
        this.router.navigateByUrl("");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    if(this.isEdit) {
      this.putBuild$ = this.buildOverviewService.putBuild(this.buildForm, this.name).subscribe(result => {
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
