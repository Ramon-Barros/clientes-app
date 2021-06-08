import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success = false;
  errors: any = null;

  constructor(
    private ClienteService: ClientesService,
    private service: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.ClienteService
      .getClientes()
      .subscribe(response => this.clientes = response); // faz a listagem de clientes
  }

  onSubmit(): void{
    this.service
    .salvar(this.servico)
    .subscribe( response => {
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado();
    }, errorREsponse => {
      this.success = false;
      this.errors = errorREsponse.error.errors;

    }
    );
  }

}
