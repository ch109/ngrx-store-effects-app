import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import {PizzaState} from "../../store/reducers/pizzas.reducer";
import {ProductsState} from "../../store/reducers";

/*
  NOTE:
    We're omitting any Service and using
    Store and Observables instead.
 */
// import { PizzasService } from '../../services/pizzas.service';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Array<Pizza>>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // Load from store
    this.pizzas$ = this.store
      .select(fromStore.getAllPizzas); //: Observable<ProductsState<PizzaState<Array<Pizza>>>>
    // Write to store
    this.store.dispatch(new fromStore.LoadPizzas());
  }
}
