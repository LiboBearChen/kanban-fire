import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todo: Task[] = [
    { title: 'ref', description: 'ffesfse' },
    { title: '32r32', description: 'r43t4wat43' },
  ];
}
