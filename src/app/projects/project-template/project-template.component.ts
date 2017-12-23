import { Component, OnInit } from '@angular/core';
import { IDService } from '../../id.service';

@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {

  constructor(public id: IDService) { }

  ngOnInit() {
  }

}
