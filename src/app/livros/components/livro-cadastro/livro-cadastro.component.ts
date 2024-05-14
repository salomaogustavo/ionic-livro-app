import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AutorInterface, AutorService } from "@autor";
import { AlertService } from "@services";
import { Subscription } from "rxjs";
import { LivroInterface, LivroService } from "@livro";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './livro-cadastro.component.html'
})
export class LivroCadastroComponent implements OnInit, OnDestroy {

  private URL_PATTERN: RegExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

  private anoAtualValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
    const anoAtual = new Date().getFullYear();

    if ( control.value && control.value > anoAtual ) {
      return { anoInvalido: true };
    }

    return null;
  }

  private autoresValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
    if ( control.value?.length < 1 ) {
      return { autoresInvalido: true };
    }

    return null;
  }

  autores: AutorInterface[] = [];
  livroId: number | null;
  livroForm: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autorService: AutorService,
    private livroService: LivroService,
    private alertService: AlertService
  ) {
    this.livroId = null;
    this.livroForm = this.createForm();
  }

  ngOnInit(): void {
    this.carregaAutores();

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id ) {
      this.livroId = parseInt(id);

      this.livroService
      .getLivro(this.livroId)
      .subscribe(
        (livro) => {
          this.livroForm = this.createForm(livro);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  carregaAutores(): void {
    const subscription = this.autorService
    .getAutores()
    .subscribe(
      (autores) => {
        this.autores = autores;
      },
      (error) => {
        console.error(error);

        this.alertService.error('Não foi possível carregar os autores. Tente novamente mais tarde');
      }
    );

    this.subscriptions.add(subscription);
  }

  private createForm(livro?: LivroInterface): FormGroup {
    return new FormGroup({
      titulo: new FormControl(livro?.titulo || '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      subtitulo: new FormControl(livro?.subtitulo || ''),
      numeroPaginas: new FormControl(livro?.numeroPaginas || 0, [
        Validators.required,
        Validators.min(5)
      ]),
      isbn: new FormControl(livro?.isbn || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      editora: new FormControl(livro?.editora || '', Validators.required),
      ano: new FormControl(livro?.ano || 2000, [
        Validators.required,
        this.anoAtualValidator
      ]),
      logoUrl: new FormControl(livro?.logoUrl || 'http://', Validators.pattern(this.URL_PATTERN)),
      preco: new FormControl(livro?.preco || 0, [
        Validators.required,
        Validators.min(0)
      ]),
      autores: new FormControl(livro?.autores || [], this.autoresValidator)
    });
  }

  compareWith(o1: AutorInterface, o2: AutorInterface): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSubmit(): void {
    const livro: LivroInterface = {
      id: this.livroId,
      ...this.livroForm.value,
    };

    this.subscriptions.add(
      this.livroService
      .up(livro)
      .subscribe(
        () => {
          this.router.navigate(['/livros']);
        },
        (error: Error) => {
          console.error(error);

          if ( livro.id ) {
            this.alertService.error('Não foi possível salvar as alterações.');
          } else {
            this.alertService.error('Não foi possível salvar o livro.');
          }
        }
      )
    );
  }
}

