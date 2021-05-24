import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private ClienteService: ClientesService
  ) { }

  ngOnInit(): void {
    this.ClienteService
      .getClientes()
      .subscribe(response => this.clientes = response); // faz a listagem de clientes
  }

  onSubmit(): void{
    console.log('submit');
  }

}
