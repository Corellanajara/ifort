import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { ModalController } from '@ionic/angular';
import { InstrumentoPage } from '../evaluaciones/instrumento/instrumento.page';
import { UserService } from '../_servicios/user.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  asignado : any = {name:'Aun no asignado'};
  valorPersonalResult = 0;
  total = 1;
  personalResults : any;
  @ViewChild("barCanvas",{static: false}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static: false}) doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas",{static: false}) lineCanvas: ElementRef;
  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;
  @ViewChild("polarCanvas",{static: false}) polarCanvas: ElementRef;
  @ViewChild("bubbleCanvas",{static: false}) comparativeCanvas: ElementRef;


  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private radarChart: Chart;
  private polarChart: Chart;
  private bubbleChart: Chart;
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  ngAfterViewInit(){
    console.log()

    this.graficarPersonalData();

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
          {
            label: "Datos a",
            fill: false,
            lineTension: 0.3,

            backgroundColor: "#4bc0c0",

            borderColor: "#4bc0c0",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",

            pointBorderColor: "#4bc0c0",
            pointBackgroundColor: "#4bc0c0",
            pointBorderWidth: 6,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#4bc0c0",
            pointHoverBorderColor: "#4bc0c0",
            pointHoverBorderWidth: 5,
            pointRadius: 1,
            pointHitRadius: 10,

            data: [10, 4, 2, 30, 14, 23, 40],
            spanGaps: false
          },
          {
            label: "Datos b",
            fill: false,
            lineTension: 0.3,
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",

            pointBorderColor: "#ff6384",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 6,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ff6384",
            pointHoverBorderColor: "#ff6384",
            pointHoverBorderWidth: 5,
            pointRadius: 1,
            pointHitRadius: 10,

            data: [2, 3, 4, 8, 3, 7, 2],
            spanGaps: false
          }
        ]
      }
  });

  this.radarChart = new Chart(this.radarCanvas.nativeElement, {
    type: "radar",
    data: {

      labels: ["A", "B", "C", "D","E"],
      datasets: [
        {
          label: "Marzo",
          data: [2,3,4,5,6],
          backgroundColor:"rgb(75,190,190,0.2)",
          borderColor: "rgb(75,190,190,1)",
          pointBorderWidth: 3,
          pointHoverRadius: 3
        },
        {
          label: "Abril",
          data: [6,5,4,3,2],
          backgroundColor:"rgb(250,240,150,0.2)",
          borderColor: "rgb(250,240,150,1)",
          pointBorderWidth: 3,
          pointHoverRadius: 3
        },
        {
          label: "Mayo",
          data: [1,2,5,2,2],
          backgroundColor:"rgb(230,90,90,0.2)",
          borderColor: "rgb(230,90,90,1)",
          pointBorderWidth: 3,
          pointHoverRadius: 3
        }
      ]
    }
  });

  this.polarChart = new Chart(this.polarCanvas.nativeElement,{
    type: "polarArea",
    data: {

      labels: ["A", "B", "C", "D","E"],
      datasets: [
        {
          label: "Marzo",
          data: [2,3,4,5,6],
          backgroundColor: [
            "rgba(255, 99, 132,0.7)",
            "rgba(54, 162, 235,0.7)",
            "rgba(23, 210, 24,0.7)",
            "rgba(75, 192, 192,0.7)",
            "rgba(234, 84, 85,0.7)"
          ],
          borderColor: [
            "rgba(255, 99, 132,1)",
            "rgba(54, 162, 235,1)",
            "rgba(23, 210, 24,1)",
            "rgba(75, 192, 192,1)",
            "rgba(234, 84, 85,1)"
          ],
        }
      ]
    }
  });



  }
  ngOnInit() {


    var valorAsignado = JSON.parse(sessionStorage.getItem('asignado'));
    console.log(valorAsignado);
    if(valorAsignado == false){
      console.log(JSON.parse(sessionStorage.getItem('asignado')))
      this.asignado = {name:'Aun no asignado'};
    }else{

      this.asignado = valorAsignado[0];
    }
  }
  constructor(
    private userService : UserService,
    private modalCtrl : ModalController,
  ) {
    this.getPersonalResults();
    this.datosMultiples();
  }
  graficarPersonalData(){
    let arr = [];
    let valores = [];
    let labels = [];
    let backgroundColors = [];
    let bordesColors = [];
    let background = ["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"];
    let bordes = ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"];

    let evaluaciones = JSON.parse(sessionStorage.getItem('evaluaciones'));
    for(let i = evaluaciones.length; i > 0 ; i = i - 1){
      if(evaluaciones[i - 1].estado > 0){
        if(arr.length != 6){
          labels.push(evaluaciones[i - 1].instrumento.sigla);
          arr.push(evaluaciones[i - 1]);
          valores.push(this.getPersonalResultsByEv(evaluaciones[i - 1]));
          backgroundColors.push(background[backgroundColors.length]);
          bordesColors.push(bordes[bordesColors.length]);
        }
      }
    }
console.log(evaluaciones);
console.log(arr);

    this.barChart = new Chart(this.barCanvas.nativeElement,{
        type:"bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Evaluaciones",
              data: valores,
              backgroundColor:backgroundColors,
              borderColor: bordesColors,
               borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                  }
              }
            ]
          }
        }
    });

  }

  traerDatos(evento){
    let userId = sessionStorage.getItem('userId');
    this.userService.gathering(userId).subscribe( datos => {
      console.log(datos);
      sessionStorage.setItem('evaluaciones',JSON.stringify(datos.evaluaciones));
      this.getPersonalResults();
      if(evento){
        evento.target.complete();
      }
    })
    this.datosMultiples();

  }


  datosMultiples(){
    this.userService.listar().subscribe( datos => {
      var labels = [];
      var datasets = [];
      var usuariosEvaluados = [];
      var agrupadosPorFecha = [];
      for(let i = 0 ; i < datos.length;i++){
        let usuario = datos[i];
        for(let i = 0 ; i < usuario.evaluaciones.length; i++){
          let ev = usuario.evaluaciones[i];
          if(ev.estado > 0){
            let percent = parseFloat(this.getPersonalPorcentByEv(ev));
            if(Number.isNaN(percent)){
              percent = 0;
            }
            let key = usuario.firstName+" "+usuario.lastName;
            let fecha = ev.fecha;
            if(agrupadosPorFecha[fecha]){
              if(agrupadosPorFecha[fecha][key]){
                  agrupadosPorFecha[fecha][key].push(percent);
              }else{
                agrupadosPorFecha[fecha][key] = [];
                agrupadosPorFecha[fecha][key].push(percent);
              }
            }else{
              agrupadosPorFecha[fecha] = [];
              agrupadosPorFecha[fecha][key] = [];
              agrupadosPorFecha[fecha][key].push(percent);
            }
            labels.indexOf(ev.instrumento.sigla) === -1 ? labels.push(ev.instrumento.sigla) : console.log("This item already exists");
            if(usuariosEvaluados.indexOf(key) === -1 ) usuariosEvaluados.push(key) ;
          }
        }
      }
      var conjuntoDatos = [];
      var datasets = [];
      var indice = 0;
      for(let identificador in agrupadosPorFecha){
        let datos = agrupadosPorFecha[identificador];
        var data = [];
        for(let i = 0 ; i < usuariosEvaluados.length; i++){
          let usr = usuariosEvaluados[i];
          console.log("datos "+datos,usr);
          let cantidad = 0;
          if(datos[usr]){
              cantidad = datos[usr];
              cantidad = cantidad[0];
          }
          data.push(cantidad);
        }
        let info = {
          label: labels[indice],
          backgroundColor: this.random_rgba(),
          data: data
        }
        datasets.push(info);
        indice += 1;
      }
      var barChartData = {
          labels: usuariosEvaluados,
          datasets: datasets
        };
      console.log(barChartData);
      this.doughnutChart = new Chart(this.comparativeCanvas.nativeElement,{
          type:"bar",
          data: barChartData,
          options: {
  					title: {
  						display: true,
  						text: 'Comparativa entre los distintos usuarios'
  					},
  					tooltips: {
  						mode: 'index',
  						intersect: false
  					},
  					responsive: true,
  					scales: {
  						xAxes: [{
  							stacked: true,
  						}],
  						yAxes: [{
  							stacked: true
  						}]
  					}
  				}
      });

    })
  }
  async verEvaluacion(evaluacion) {
    const modal = await this.modalCtrl.create({
      component:  InstrumentoPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': evaluacion.instrumento,
      'noOcultar': false
    }
    });

    return await modal.present();
  }
  getPersonalEvaluation(){
    let evaluaciones = JSON.parse(sessionStorage.getItem('evaluaciones'));
    for(let i = evaluaciones.length; i > 0 ; i = i - 1){
      if(evaluaciones[i - 1].estado > 0){
        return evaluaciones[i - 1];
      }
    }
  }
  getPersonalPorcentByEv(evaluacion){
    var instrumento = evaluacion.instrumento ;
    var puntos = 0;
    for(let indice = 0 ; indice < instrumento.indicadores.length;indice++){
      let indicador = instrumento.indicadores[indice];
      if(indicador.valor){
          puntos += indicador.valor;
      }
    }
    return (puntos/instrumento.indicadores.length).toFixed(1);
  }
  getPersonalResultsByEv(evaluacion){
    var instrumento = evaluacion.instrumento ;
    var puntos = 0;
    for(let indice = 0 ; indice < instrumento.indicadores.length;indice++){
      let indicador = instrumento.indicadores[indice];
      if(indicador.valor){
          puntos += indicador.valor;
      }
    }
    return puntos;

  }
  obtenDatos(){
    var datos = this.personalResults/this.total;    
    return datos.toFixed(1);
  }
  getPersonalResults(){

    if(this.valorPersonalResult > 0){
      if(this.valorPersonalResult <= 100){
          return this.valorPersonalResult;
      }
    }
    let evaluaciones = JSON.parse(sessionStorage.getItem('evaluaciones'));
    for(let i = evaluaciones.length; i > 0 ; i = i - 1){

      if(evaluaciones[i - 1].estado > 0){
        var instrumento = evaluaciones[i - 1].instrumento ;
        var puntos = 0;
        var cantidad = 0;
        for(let indice = 0 ; indice < instrumento.indicadores.length;indice++){
          let indicador = instrumento.indicadores[indice];
          if(indicador.valor){
              puntos += indicador.valor;
              cantidad += 1;
          }
        }
        console.log(puntos);
        this.valorPersonalResult = puntos;
        this.valorPersonalResult / cantidad;
        this.total = instrumento.indicadores.length;
        this.personalResults = puntos;
        return puntos;
      }
    }

  }

}
