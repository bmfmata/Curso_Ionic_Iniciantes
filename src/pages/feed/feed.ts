import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    nome: "Bruno da Mata",
    date: "08 Julho, 2018",
    descricao: "O que está achando do App?",
    qntd_likes: "12 Likes",
    qntd_comments: "4 Comments",
    time_comment: "11h ago"

  }


  public nome_usuario: string = "Bruno da Mata"

  constructor(
    public navCtrl: NavController,
    public movieProvider: MoovieProvider,
    public navParams: NavParams) {
  }

  public EstadoSistema(est: string): void {
    alert(est)
  }

  ionViewDidLoad() {
    //this.EstadoSistema("Manual");
    this.movieProvider.getLastestMovies().subscribe(
      data => {
        //const response = (data as any);
        //const objeto_retorno = JSON.parse(response._body);
        console.log(data);
      error =>{
        console.log(error);
      }

      }
    )

  }

}
