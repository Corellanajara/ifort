import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { ModalController } from '@ionic/angular';
import { InstrumentoPage } from '../evaluaciones/instrumento/instrumento.page';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  asignado : any;
  valorPersonalResult = 0;
  personalResults : any;

  @ViewChild("barCanvas",{static: false}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static: false}) doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas",{static: false}) lineCanvas: ElementRef;
  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;
  @ViewChild("polarCanvas",{static: false}) polarCanvas: ElementRef;
  @ViewChild("bubbleCanvas",{static: false}) bubbleCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  private radarChart: Chart;
  private polarChart: Chart;
  private bubbleChart: Chart;

  ngAfterViewInit(){
    console.log("hola mundo");
    this.graficarPersonalData();

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255, 99, 132,0.7)",
              "rgba(54, 162, 235,0.7)",
              "rgba(23, 210, 24,0.7)",
              "rgba(75, 192, 192,0.7)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(23, 210, 24,1)",
              "rgba(75, 192, 192, 1)",
            ],
            hoverBackgroundColor: ["rgba(255, 99, 132)","rgba(54, 162, 235)","rgba(23, 210, 24,1)","rgba(75, 192, 192)"]
          }
        ]
      }
    });

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

  this.bubbleChart = new Chart(this.bubbleCanvas.nativeElement,{
    type: "bubble",
    data: {
    labels: "Africa",
    datasets: [
      {
        label: ["A"],
        backgroundColor: "rgba(255,221,50,0.2)",
        borderColor: "rgba(255,221,50,1)",
        data: [{
          x: 21269017,
          y: 5.245,
          r: 15
        }]
      },
      {
        label: ["B"],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        data: [{
          x: 258702,
          y: 7.526,
          r: 10
        }]
      },
      {
        label: ["C"],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        data: [{
          x: 3979083,
          y: 6.994,
          r: 15
        }]
      },
      {
        label: ["D"],
        backgroundColor: "rgba(193,46,12,0.2)",
        borderColor: "rgba(193,46,12,1)",
        data: [{
          x: 4931877,
          y: 5.921,
          r: 50
        }]
      }
    ]
  }
  });

  }
  ngOnInit() {
    let ishidden = true;
    this.asignado = JSON.parse(sessionStorage.getItem('asignado'));
    console.log(this.asignado);

    if(!this.asignado){
      this.asignado = {name:'Aun no asignado'};
    }else{
      this.asignado = this.asignado[0];
    }
  }
  constructor(
    private userService : UserService,
    private modalCtrl : ModalController,
  ) {
    this.getPersonalResults();
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
          labels.push(evaluaciones[i - 1].instrumento.nombre);
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
  getPersonalResultsByEv(evaluacion){
    var instrumento = evaluacion.instrumento ;
    var puntos = 0;
    for(let indice = 0 ; indice < instrumento.indicadores.length;indice++){
      let indicador = instrumento.indicadores[indice];
      if(indicador.valor){
          puntos += indicador.valor;
      }
    }
    //console.log(puntos);
    //this.valorPersonalResult = puntos;
    //this.personalResults = puntos;
    return puntos;

  }
  getPersonalResults(){

    if(this.valorPersonalResult > 0){
      return this.valorPersonalResult;
    }
    let evaluaciones = JSON.parse(sessionStorage.getItem('evaluaciones'));
    for(let i = evaluaciones.length; i > 0 ; i = i - 1){

      if(evaluaciones[i - 1].estado > 0){
        var instrumento = evaluaciones[i - 1].instrumento ;
        var puntos = 0;
        for(let indice = 0 ; indice < instrumento.indicadores.length;indice++){
          let indicador = instrumento.indicadores[indice];
          if(indicador.valor){
              puntos += indicador.valor;
          }
        }
        console.log(puntos);
        this.valorPersonalResult = puntos;
        this.personalResults = puntos;
        return puntos;
      }
    }

  }

}
