import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MessageService 
{
  messages: string[] = [];

  constructor() { }

  /* Add */
  // Adds a string message to the list of all string messages
  add(message: string) {
    this.messages.push(message);
  }

  /* Clear */
  // Empties the list of strings in messages
  clear() {
    this.messages = [];
  }
}
