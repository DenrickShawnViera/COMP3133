import { Component } from '@angular/core';
import { HeroesComponent } from './heroes/heroes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}