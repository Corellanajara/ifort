import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from '../../_servicios/user.service';
import { Chart } from "chart.js";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  evaluacion = undefined;
  indicadores = []
  titulo = "";
  tipo = undefined;
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"]
  tipoActual = "bar";
  titulos = []
  valores = []
  colores = []
  fondos = []
  @ViewChild("graficoCanvas",{static: false}) grafico: ElementRef;
  private chart: Chart;

  constructor(private userService:UserService,private navParams : NavParams) {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(usuario.permissionLevel > 4){
        this.traerTodos();
    }else{
        this.traerDatos();
    }

  }
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r().toFixed(1) + 1) + ')';
    return rgb;
  }
  ngOnInit(){
  }
  traerTodos(){
    this.userService.listar().subscribe(datos=>{
      var usuarios = datos;
      for(let i = 0 ; i < usuarios.length; i++){
          let obj = usuarios[i][this.navParams.get("tipo").toLowerCase()];
          if(obj){
            console.log(obj);
          }

      }
    })
  }
  traerDatos(){
    this.evaluacion = this.navParams.get('instrumento');
    if(this.evaluacion.instrumento){
      this.titulo = this.evaluacion.instrumento.nombre
      if(this.evaluacion.instrumento.indicadores){
        this.indicadores = this.evaluacion.instrumento.indicadores;
        for(let i = 0 ; i  < this.indicadores.length;i++){
          let indicador = this.indicadores[i];
          this.titulos.push(indicador.titulo);
          this.valores.push(indicador.valor);
          this.colores.push(this.random_rgba());
          this.fondos.push(this.random_rgba());
        }

      }
    }
    if(this.evaluacion.preguntas){
      this.titulo = this.evaluacion.titulo;
      for(let i = 0 ; i < this.evaluacion.preguntas.length;i++){
        let pregunta = this.evaluacion.preguntas[i];
        this.titulos.push(pregunta.titulo);
        this.valores.push(this.evaluacion.resultados[i]);
        this.colores.push(this.random_rgba());
        this.fondos.push(this.random_rgba());
      }
    }
  }
  ngAfterViewInit() {
    console.log(this.fondos)
    console.log(this.colores)
    console.log(this.titulos);
    console.log(this.valores);

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart(this.grafico.nativeElement,{
      type: this.tipoActual,
      data: {

        labels: this.titulos,
        datasets: [
          {
            label: this.titulo,
            data: this.valores,
            backgroundColor: this.colores,
            borderColor: this.fondos,
          }
        ]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });


  }
  exportar(id)
  {
      var canvas = document.querySelector('#'+id);
      //creates image
      console.log(canvas);
      var canvasImg = canvas.toDataURL("image/png", 1.0);
      //creates PDF from img
      var doc = new jsPDF('landscape');
      doc.addImage(canvasImg, 'PNG', 10, 10, 280, 150 );
  //    doc.save('canvas.pdf');
      let pdfSalida = doc.output();
      let buffer = new ArrayBuffer(pdfSalida.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfSalida.length; i++) {
        array[i] = pdfSalida.charCodeAt(i);
      }
      let archivo = new Blob([array], { type: 'application/pdf' });
      var urlArchivo = URL.createObjectURL(archivo);
      window.open(urlArchivo);
  }

}
