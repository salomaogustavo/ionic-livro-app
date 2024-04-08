import { Component, OnDestroy, OnInit } from "@angular/core";
import { BoredService } from "../../services/bored.service";
import { Subscription } from "rxjs";
import { Activity } from "../../types/activity.class";
import { AlertService } from '@services';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: './bored-lista.component.html',
})
export class BoredListaComponent implements OnInit, OnDestroy {
    public types: String[] = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
    public activity!: Activity;
    private subscription!: Subscription;

    activityForm = new FormGroup({
        type: new FormControl('', Validators.required)
    });

    constructor(
        private boredService: BoredService,
        private alertService: AlertService,
    ) {

    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    fetchActivity(type: string): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.boredService
        .getActivity(type)
        .subscribe(
            (response: Activity) => {
                console.log('Response: ', response);

                this.activity = response;
            },
            (error: Error) => {
                console.error(error);

                this.alertService.error('Erro ao carregar atividade!');
            }
        );
    }

    compareWith(o1: string, o2: string) {
        return o1 === o2;
    }

    onSubmit() {
        let selectedType = this.activityForm.get('type')?.value;

        if (selectedType) {
            this.fetchActivity(selectedType);
        }
    }
}
