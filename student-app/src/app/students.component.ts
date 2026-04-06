import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: true,
  template: `
    <h2>{{ getTitle() }}</h2>
    <p>{{ getCurrentDate() }}</p>
  `
})
export class StudentsComponent {
  title: string = 'Welcome to Students Component';

  getTitle(): string {
    return this.title;
  }

  getCurrentDate(): string {
    return `Current Date: ${new Date().toLocaleDateString()}`;
  }
}