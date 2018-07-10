import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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


  public loader;
  public lista_filmes = new Array<any>(); // any é objeto de javascript para receber qualquer informacao
  public refresher;
  public isRefreshing: boolean = false;

  public nome_usuario: string = "Bruno da Mata"

  constructor(
    public navCtrl: NavController,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  public EstadoSistema(est: string): void {
    alert(est)
  }

  //vai para página Detalhes

  abreDetalhes(filme){
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
        }
    
  
  // Carrega o Loading

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  //Fecha o Loading

  fechaCarregando(){
    this.loader.dismiss();
  }


doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }


  //ionViewDidLoad() carrega só quando entra na página depois nao carrega mais, mesmo que clique denovo
  //ionViewDidEnter() Carrega toda a vez que entra no aplicativo

  carregarFilmes() {
    //this.EstadoSistema("Manual");
    this.abreCarregando();
    this.movieProvider.getLastestMovies().subscribe(
      data => {
        const response = (data as any); //Data pode receber qualquer valor
        const objeto_retorno = JSON.parse(response._body); //Converte texto para JSON
        this.lista_filmes = objeto_retorno.results; //As infromacoes dos filmes estão dentro de results, joga para variavel
        console.log(objeto_retorno); //Recebe a informação em formato JSON
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
      }
      error =>{
        console.log(error);//Dando Error, exibe os erros
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
      }
      }

      }
    )

  }

}
