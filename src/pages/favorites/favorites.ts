import { Component } from '@angular/core';

import { ModalController } from "ionic-angular";

import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    private quotesService: QuotesService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.quotes = this.quotesService.getfavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();    
    modal.onDidDismiss((unfavorite: boolean) => {
      if (unfavorite) {
        this.quotesService.removeQuoteFromFavorites(quote);
        const foundQuote = this.quotes.findIndex((quoteEl: Quote) => {
          return quoteEl.id == quote.id;
        });

        this.quotes.splice(foundQuote, 1);
      }
    });
  }
}
