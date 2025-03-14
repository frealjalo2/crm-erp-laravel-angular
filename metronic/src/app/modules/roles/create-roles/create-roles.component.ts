import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  name: string = '';
  isLoading: any = false;
  SIDEBAR: any = SIDEBAR;

  permissions: string[] = [];

  constructor(public modal: NgbActiveModal, public rolesService: RolesService, public toast: ToastrService) {

  }

  store(){
    if(!this.name){
      this.toast.error("Validación", "El nombre es requerido");
      return;
    }
    if(this.permissions.length === 0){
      this.toast.error("Permissions", "Los permisos son requeridos");
    }
    let data = {
      name: this.name,
      permissions: this.permissions
    }
    this.rolesService.registerRole(data).subscribe((resp: any) => {
      console.log(resp)
    });
  }

  ngOnInit(): void {

  }

  addPermission(permiso: string){
    let index = this.permissions.findIndex((perm: string) => perm == permiso);
    if(index !== -1){
      this.permissions.splice(index, 1);
    }else{
      this.permissions.push(permiso);
    }
    console.log(this.permissions);
  }
}
