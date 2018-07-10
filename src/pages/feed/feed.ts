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


  public lista_filmes = new Array<any>(); // any é objeto de javascript para receber qualquer informacao

  public nome_usuario: string = "Bruno da Mata"

  constructor(
    public navCtrl: NavController,
    private movieProvider: MoovieProvider,
    public navParams: NavParams) {
  }

  public EstadoSistema(est: string): void {
    alert(est)
  }

  ionViewDidLoad() {
    //this.EstadoSistema("Manual");
    this.movieProvider.getLastestMovies().subscribe(
      data => {
        const response = (data as any); //Data pode receber qualquer valor
        const objeto_retorno = JSON.parse(response._body); //Converte texto para JSON
        this.lista_filmes = objeto_retorno.results; //As infromacoes dos filmes estão dentro de results, joga para variavel
        console.log(objeto_retorno); //Recebe a informação em formato JSON
      error =>{
        console.log(error);//Dando Error, exibe os erros
      }

      }
    )

  }

}
