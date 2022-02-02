import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';
import { HEROES } from './../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = HEROES;
  selectedHero?: Hero;

  constructor() { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log("Selected Hero: " + this.selectedHero.name);
  }

  ngOnInit(): void {
  }

}
