import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular"
import { LivroService } from "@livro";
import { Subscription } from "rxjs";
import { Livro } from "../../types/livro.class";
import { AlertService } from '@services';

@Component({
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss']
})
export class LivroListaComponent implements OnInit, OnDestroy {

  public livros: Livro[] = [];
  private subscription!: Subscription;

  constructor(
    private alertController: AlertController,
    private livroService: LivroService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.livroService
    .getLivros()
    .subscribe(
      (response) => {
        this.livros = response;
      },
      (error) => {
        console.error(error);

        this.alertService.error('Erro ao carregar listagem de livros');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  excluir(livro: Livro): void {
    this.alertController
    .create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o livro ${livro.titulo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.livroService
            .remove(livro)
            .subscribe({
              next: () => {
                this.livros = this.livros.filter(
                  l => l.id !== livro.id
                )
              },
              error: (error: Error) => {
                console.error(error)
              }
            })
          },
        },
        {
          text: 'Não',
        },
      ],
    })
    .then((alerta) => alerta.present());
  }
}
