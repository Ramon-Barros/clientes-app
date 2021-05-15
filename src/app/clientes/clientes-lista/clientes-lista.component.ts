import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor( private service: ClientesService,
               private router: Router ) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(resposta => this.clientes = resposta);
  }

  novoCadastro(): void{
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao( cliente: Cliente): void {
    this.clienteSelecionado = cliente;
  }
  deletarCliente(): void {
    this.service.deletar(this.clienteSelecionado).subscribe(
      response => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!';
        this.ngOnInit(); },
      erro => this.mensagemErro = 'Erro ao deletar o cliente'
    );
  }

}
