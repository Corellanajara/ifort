import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { ModalController,PickerController } from '@ionic/angular';
import { InstrumentoPage } from '../evaluaciones/instrumento/instrumento.page';
import { ListPage } from '../list/list.page';
import { UserService } from '../_servicios/user.service';
import { Router } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  asignado : any = {name:'Aun no asignado'};
  valorPersonalResult = 0;
  total = 1;
  fechas = {Meses: new Date().getMonth(),Años:new Date().getFullYear()};
  tipoActual = "bar";
  isAdmin = false;
  usuarioActual = 0;
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"]
  usuario = {encuestas : [],evaluaciones : [],canjeables : [], permissionLevel : 5};
  usuarios = [];
  personalResults : any;
  @ViewChild("barCanvas",{static: false}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static: false}) doughnutCanvas: ElementRef;
  @ViewChild("radarCanvas",{static: false}) radarCanvas: ElementRef;
  @ViewChild("polarCanvas",{static: false}) polarCanvas: ElementRef;
  @ViewChild("bubbleCanvas",{static: false}) comparativeCanvas: ElementRef;
  @ViewChild("webCanvas",{static: false}) webCanvas: ElementRef;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  private barChart: Chart;
  private char : Chart;
  private doughnutChart: Chart;
  private radarChart: Chart;
  private polarChart: Chart;
  private bubbleChart: Chart;
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.5)'
    console.log(rgb)
    return rgb;
  }

  ngAfterViewInit(){
    Chart.defaults.global.legend.display = false;
    var menu = document.querySelector('ion-menu')
    menu.hidden = false;
    console.log("acabo de mostrar el menu");
    this.graficarPersonalData();

  }
  ngOnInit() {


    var valorAsignado = JSON.parse(sessionStorage.getItem('asignado'));
    if(valorAsignado == false){
      this.asignado = {name:'Aun no asignado'};
    }else{
      this.asignado = valorAsignado[0];
    }
    var menu = document.querySelector('ion-menu')
    menu.hidden = false;
    console.log("acabo de mostrar el menu");


  }
  async cambiarMes() {
    var meses = [{text:'Enero 2020',value:"1 2020"},{text:'Febrero 2020',value:'2 2020'},{text:'Marzo 2020',value:'3 2020'},{text:'Abril 2020',value:'4 2020'},{text:'Mayo 2020',value:'5 2020'},{text:'Junio 2020',value:'6 2020'},{text:'Julio 2020',value:'7 2020'},{text:'Agosto 2020',value:'8 2020'},{text:'Septiembre 2020',value:'9 2020'},{text:'Octubre 2020',value:'10 2020'},{text:'Noviembre 2020',value:'11 2020'},{text:'Diciembre 2020',value:'12 2020'}]
    //var years = [{text:"2020",value:"2020"},{text:"2019",value:"2019"}]
    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: 'Listo',
        handler: (fechas) => {
          this.traerDatosFiltrados(fechas);
        }
      }],
      columns: [
        {
          name: 'Fecha',
          options: meses
        }
      ]
    });

    await picker.present();

}
  traerDatosFiltrados(fechas){
    if(fechas){
        this.fechas = fechas;
    }else{
      fechas = this.fechas;
    }

    let background = [];
    let bordes = [];
    var evaluaciones = [];
    var instrumentos = [];
    var labels = [];
    var conjuntos = [];
    var users = this.usuarios;
    console.log(users);
    console.log(fechas)
    var usuarios = users.filter(function(usuario){
      return usuario.evaluaciones.length > 0
    });
    var fs = fechas.Fecha.value;
    var arr = fs.split(" ");
    var y = arr[1];
    var m = arr[0];
    var fecha = new Date(y+"/"+m);
    console.log(fecha);
    for(var usuario of usuarios){
      var nombre = usuario.firstName +" "+usuario.lastName;
      evaluaciones[nombre] = [];
      conjuntos[nombre] = [];
      var datos = usuario.evaluaciones.filter(function(ev){
        var fechaEv = new Date(ev.fecha);
        var year = fechaEv.getFullYear();
        var month = fechaEv.getMonth() + 1;
        return (year == y && month == m && ev.estado === 1)
      })
      console.log(datos);
      for(var ev of datos){
        let por  = this.getPersonalResultsByEv(ev);
        ev.por = por;
        ev.sigla = ev.instrumento.sigla;
        evaluaciones[nombre].push(ev);
        labels.indexOf(nombre) === -1 ? labels.push(nombre) : '';
        conjuntos[nombre][ev.sigla] = (por);
      }
    }

    for(var key in evaluaciones){
        for(var instrumento of evaluaciones[key]){
            var sigla =  instrumento.instrumento.sigla;
            instrumentos.indexOf(sigla) === -1 ? instrumentos.push(sigla) : '';
        }
    }
    for(var key in evaluaciones){
      for(var sigla of instrumentos){
        if(!conjuntos[key][sigla]){
          conjuntos[key][sigla] = 0;
        }
      }
    }
    console.log(labels);
    console.log(instrumentos);
    console.log(conjuntos);

    var datasets = [];
    var i = 0;
    for(let key in conjuntos){
      var evaluacion = conjuntos[key];
      let info = {
        label: key,
        data: this.aproximar(Object.values(evaluacion)),
        backgroundColor:this.random_rgba(),
        borderColor: this.random_rgba(),
        borderWidth: 2
      }
      datasets.push(info);
      i++;
    }
    var barChartData = {
        labels: instrumentos,
        fill: false,
        datasets: datasets
      };
    console.log(barChartData);


    if(this.doughnutChart){
      this.doughnutChart.destroy();
    }

      this.doughnutChart = new Chart(this.webCanvas.nativeElement,{
          type:this.tipoActual,
          data: barChartData,
          options: {
            title: {
              display: true,
              text: 'Comparativa entre los distintos usuarios'
            },
            elements: {
                line: {
                        fill: false
                }
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                  }
              }]
            }
          }
      });

  }
  traerDatosGraph(fechas){
    if(fechas){
        this.fechas = fechas;
    }else{
      fechas = this.fechas;
    }

    let background = [];
    let bordes = [];
    var evaluaciones = [];
    var instrumentos = [];
    var labels = [];
    var conjuntos = [];
    var users = this.usuarios;
    console.log(users);
    console.log(fechas)
    var usuarios = users.filter(function(usuario){
      return usuario.evaluaciones.length > 0
    });
    var fs ;
    var fecha;
    var m;
    var y;
    if(fechas.Fecha){
      fs = fechas.Fecha.value;
      var arr = fs.split(" ");
      y = arr[1];
      m = arr[0];
      fecha = new Date(y+"/"+m);
    }else{
      var d = new Date();
      m = d.getMonth();
      m++;
      y = d.getFullYear();
      fecha = m+"/"+y;
    }
    console.log(fecha);
    for(var usuario of usuarios){
      var nombre = usuario.firstName +" "+usuario.lastName;
      evaluaciones[nombre] = [];
      conjuntos[nombre] = [];
      var datos = usuario.evaluaciones.filter(function(ev){
        var fechaEv = new Date(ev.fecha);
        var year = fechaEv.getFullYear();
        var month = fechaEv.getMonth() + 1;
        return (year == y && month == m && ev.estado === 1)
      })
      console.log(datos);
      for(var ev of datos){
        let por  = this.getPersonalResultsByEv(ev);
        ev.por = por;
        ev.sigla = ev.instrumento.sigla;
        evaluaciones[nombre].push(ev);
        labels.indexOf(nombre) === -1 ? labels.push(nombre) : '';
        conjuntos[nombre][ev.sigla] = (por);
      }
    }

    for(var key in evaluaciones){
        for(var instrumento of evaluaciones[key]){
            var sigla =  instrumento.instrumento.sigla;
            instrumentos.indexOf(sigla) === -1 ? instrumentos.push(sigla) : '';
        }
    }
    for(var key in evaluaciones){
      for(var sigla of instrumentos){
        if(!conjuntos[key][sigla]){
          conjuntos[key][sigla] = 0;
        }
      }
    }
    console.log(labels);
    console.log(instrumentos);
    console.log(conjuntos);

    var datasets = [];
    var i = 0;
    for(let key in conjuntos){
      var evaluacion = conjuntos[key];
      let info = {
        label: key,
        data: this.aproximar(Object.values(evaluacion)),
        backgroundColor:this.random_rgba(),
        borderColor: this.random_rgba(),
        borderWidth: 2
      }
      datasets.push(info);
      i++;
    }
    var barChartData = {
        labels: instrumentos,
        fill: false,
        datasets: datasets
      };
    console.log(barChartData);


    if(this.doughnutChart){
      this.doughnutChart.destroy();
    }

      this.doughnutChart = new Chart(this.webCanvas.nativeElement,{
          type:this.tipoActual,
          data: barChartData,
          options: {
            title: {
              display: true,
              text: 'Comparativa entre los distintos usuarios'
            },
            elements: {
                line: {
                        fill: false
                }
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                  }
              }]
            }
          }
      });

  }
  aproximar(datos){
    var data = [];
    for(let i = 0 ; i < datos.length;i++){
      data.push(Math.round(datos[i]));
    }
    return data;
  }
  navegar(ruta){
    this.router.navigate([ruta]);
  }
  constructor(
    private router : Router,
    private userService : UserService,
    private modalCtrl : ModalController,
    public pickerCtrl: PickerController
  ){
    this.getPersonalResults();
    this.datosMultiples();
    this.traerDatos(false);
    var menu = document.querySelector('ion-menu')
    menu.hidden = false;
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
          var valor = this.getPersonalResultsByEv(evaluaciones[i - 1]);
          valores.push(Math.round(valor));
          backgroundColors.push(background[backgroundColors.length]);
          bordesColors.push(bordes[bordesColors.length]);
        }
      }
    }

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
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(!usuario){
      this.router.navigate(['login']);
    }
    this.usuario = usuario;
    console.log("usuario",usuario);
    let userId = sessionStorage.getItem('userId');
    let self = this;
    this.userService.gathering(userId).subscribe( datos => {
      usuario = datos;
      if( parseInt(datos.permissionLevel) > 4){
        self.userService.listar().subscribe(usuarios =>{
          this.usuarios = usuarios;
          if(parseInt(usuario.permissionLevel) <= 4){
            this.getPersonalResults();
          }else{
            this.isAdmin = true;
            this.getGeneralData();
          }
          console.log(usuarios);
        })
      }
      console.log(datos);
      sessionStorage.setItem('evaluaciones',JSON.stringify(datos.evaluaciones));

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
            //labels.indexOf(ev.instrumento.sigla) === -1 ? labels.push(ev.instrumento.sigla) : console.log("This item already exists");
            labels.push(ev.instrumento.sigla);
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

      if(this.char){
        this.char.destroy();
      }

        this.char = new Chart(this.comparativeCanvas.nativeElement,{
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
  async verEvaluaciones(){
    const modal = await this.modalCtrl.create({
      component: ListPage,
      cssClass: 'modals',
      componentProps:{
        'tipo' : 'Evaluaciones'
      }
    });

    return await modal.present();
  }
  async verEncuestas(){
    const modal = await this.modalCtrl.create({
      component: ListPage,
      cssClass: 'modals',
      componentProps:{
        'tipo' : 'Encuestas'
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

    return puntos/instrumento.indicadores.length;
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
  getGeneralResults(evaluaciones){

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
        return (puntos / cantidad).toFixed(1);;
      }
    }
  }

  getGeneralData(){
    var evaluados = 0;
    var puntaje = 0 ;
    for(let i = 0 ; i < this.usuarios.length; i++){
      var ev = this.usuarios[i].evaluaciones;
      if(ev.length > 0){
        evaluados ++;
        var res = this.getGeneralResults(ev);
        if(parseInt(res)>0){
            puntaje += parseFloat(res);
        };
      }
    }
    this.personalResults = puntaje;
    this.total = evaluados;
    this.traerDatosGraph(false);
    var d = new Date();
    var m = d.getMonth();
    m++;
    var y = d.getFullYear();
    var fechas = m+" "+y;
    var fecha = {Fecha:{value:''}};
    fecha.Fecha.value = fechas;
    //this.traerDatosFiltrados(fecha);
  }

  dibujarGrafico(){
    console.log(this.usuarioActual)
    let arr = [];
    let valores = [];
    let labels = [];
    let backgroundColors = [];
    let bordesColors = [];
    let background = ["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"];
    let bordes = ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"];

    let evaluaciones = this.usuarios[this.usuarioActual].evaluaciones;
    if(!evaluaciones){
      return;
    }
    for(let i = evaluaciones.length; i > 0 ; i = i - 1){
      if(evaluaciones[i - 1].estado > 0){
        if(arr.length != 6){
          labels.push(evaluaciones[i - 1].instrumento.sigla);
          arr.push(evaluaciones[i - 1]);
          valores.push(Math.round(this.getPersonalResultsByEv(evaluaciones[i - 1])) );
          backgroundColors.push(background[backgroundColors.length]);
          bordesColors.push(bordes[bordesColors.length]);
        }
      }
    }
    for(let valor of valores){
      valor = Math.round(valor);
    }
    if(this.radarChart){
      this.radarChart.destroy();
    }

    this.radarChart = new Chart(this.radarCanvas.nativeElement,{
        type:this.tipoActual,
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
                    min: 0
                }
              }
            ],
            xAxes:[
              {
                ticks:{
                  min : 0,
                  max : 100
                }
              }
            ]
          }
        }
    });
  }
  exportar(id)
  {
      var canvas = document.querySelector('#'+id) as HTMLCanvasElement;;
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
