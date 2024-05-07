import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AutorInterface } from '../../types/autor.interface';
import { AutorService } from '../../services/autor.service';
import { AlertService } from '@services';

@Component({
  selector: 'app-autores',
  templateUrl: './autores-lista.page.html',
})
export class AutoresListaComponent implements OnInit {

  autores: AutorInterface[] = [];

  constructor(
    private alertController: AlertController,
    private autorService: AutorService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    const observable = this.autorService.getAutores();

    observable.subscribe(
      (dados) => {
        this.autores = dados;
      },
      (error: Error) => {
        console.error(error);

        this.alertService.error('Erro ao carregar listagem de autores');
      }
    );
  }

  confirmarExclusao(autor: AutorInterface): void {
    this.alertController
    .create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${autor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(autor),
        },
        {
          text: 'Não',
        },
      ],
    })
    .then((alerta) => alerta.present());
  }

  private excluir(autor: AutorInterface): void {
    if (autor.id) {
      this.autorService.excluir(autor.id).subscribe(
        () => this.listar(),
        (error: Error) => {
          console.error(error);

          this.alertService.error(`Não foi possível excluir o autor ${autor.nome}`);
        }
      );
    }
  }
}
