import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit 
{
  heroes$!: Observable<Hero[]>; // Observable list
  private searchTerms = new Subject<string>(); // Observable term that updates based on textbox in html

  constructor(private heroService: HeroService) { }

  /* Search */
  // Performs a search on the list of all heroes based on a provided term
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms
      .pipe(debounceTime(300), // wait 300ms
      distinctUntilChanged(), // ignore term if same as before
      switchMap((term: string) => this.heroService.searchHeroes(term)) //Change search observable
      );
  }

}
