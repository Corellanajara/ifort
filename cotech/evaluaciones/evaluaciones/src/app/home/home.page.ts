import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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
    this.barChart = new Chart(this.barCanvas.nativeElement,{
        type:"bar",
        data: {
          labels: ["Madera","Concreto","Zinc","Tierra","Acero","Plástico"],
          datasets: [
            {
              label: "Materiales 2019",
              data: [12,19,3,5,2,3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
               borderWidth: 2
            },
            {
              label: "Materiales 2020",
              data: [13,18,3,6,1,4],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
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

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Ofertas Caducadas", "Ofertas Completadas", "Ofertas Activas con Match", "Ofertas Activas sin Match "],
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
            label: "Ofertas Completadas",
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
            label: "Ofertas Caducadas",
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

      labels: ["Madera", "Zinc", "Tierra", "Concreto","Plástico"],
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

      labels: ["Madera", "Zinc", "Tierra", "Concreto","Plástico"],
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
        label: ["Madera"],
        backgroundColor: "rgba(255,221,50,0.2)",
        borderColor: "rgba(255,221,50,1)",
        data: [{
          x: 21269017,
          y: 5.245,
          r: 15
        }]
      },
      {
        label: ["Tierra"],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        data: [{
          x: 258702,
          y: 7.526,
          r: 10
        }]
      },
      {
        label: ["Zinc"],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        data: [{
          x: 3979083,
          y: 6.994,
          r: 15
        }]
      },
      {
        label: ["Concreto"],
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


  }
  constructor() {

  }

}
