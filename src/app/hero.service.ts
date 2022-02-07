import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({providedIn: 'root'})
export class HeroService 
{
  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private messageService: MessageService, private http: HttpClient) { }

  /* Add Hero */
  // Contacts the server where the data is held and adds a new hero by name
  // ID is autogenerated by the database
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
      );
  }

  /* Delete Hero */
  // Contacts the server where the data is held and deletes the hero by ID
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /* Get Heroes */
  // Contacts the server where the data is held and retrieves the list of all heroes
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /* Get Hero */
  // Contacts the server where the data is held and retrieves the hero by ID
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* Search Heroes */
  // Contacts the server where the data is held and searches for a hero based on name
  // If found returns the hero data, otherwise does nothing
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) return of([]);

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /* Update Hero */
  // Contacts the server where the data is held and changes the name field at the specified id
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
      );
  }

  /* Log */
  // Utilizes the message service to display important app information
  private log(message: string): void {
    this.messageService.add("HeroService: " + message);
  }

  /* Handle Error */
  // Custom error handler that returns a status message of the method that failed an operation
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
