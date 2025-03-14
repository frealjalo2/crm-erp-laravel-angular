import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolesComponent } from '../create-roles/create-roles.component';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

  constructor(public modalSevice: NgbModal){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createRol() {
    const modalRef = this.modalSevice.open(CreateRolesComponent, {centered:true, size:'md'});
  }

}
