import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  constructor() {}

  ngOnInit(): void {}
}
