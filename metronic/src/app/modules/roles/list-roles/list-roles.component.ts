import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolesComponent } from '../create-roles/create-roles.component';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

  search: string = '';
  roles: any[] = [];

  isLoading: any;

  constructor(
    public modalSevice: NgbModal,
    public rolesService: RolesService,
  ){

  }

  ngOnInit(): void {
    this.listRoles()
    this.isLoading = this.rolesService.isLoading$;
  }

  listRoles(page: number = 1){
    this.rolesService.listRoles(page, this.search).subscribe((resp: any) => {
      this.roles = resp.roles;
    });
  }

  createRol() {
    const modalRef = this.modalSevice.open(CreateRolesComponent, {centered:true, size:'md'});
  }

}
