import { Component, OnInit } from '@angular/core';

import { Hero } from './../hero';
import { HeroService } from './../hero.service';
import { MessageService } from './../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit 
{

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  /* Get Heroes */
  // Calls HeroService to retrieve the list of heroes
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    // Initialize list of heroes from service
    this.getHeroes();
  }

}
