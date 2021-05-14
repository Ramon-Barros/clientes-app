import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success = false;
  errors: any = null;
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
                ) {
    this.cliente = new Cliente();

  }

  ngOnInit(): void {
    const params: Params = this.activatedRoute.params;
    if (params && params.value && params.value.id){
      this.id = params.value.id;
      this.service.getClienteById(this.id)
          .subscribe(response => this.cliente = response,
            errorResponse => this.cliente = new Cliente()
            );
    }
  }
  voltarParaListagem(): void {
    this.router.navigate(['/clientes-lista']);
  }
  onSubmit(): void{
    this.service.salvar(this.cliente).subscribe( response => {
      this.success = true;
      this.errors = null;
      this.cliente = response;
    }, errorREsponse => {
      this.success = false;
      this.errors = errorREsponse.error.errors;

    }
    );
  }

}
