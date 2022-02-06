import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService 
{

  constructor(private messageService: MessageService) { }

  /* Ger Heroes */
  // Returns the data from mock-heroes in a list of type Hero
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("Hero Service: Fetched all heroes");
  return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!;
    this.messageService.add("HeroService: fetched hero id=" + hero.id);
    return of(hero);
  }
}
