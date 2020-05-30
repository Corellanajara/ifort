import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { UserService } from '../../_servicios/user.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Chart } from "chart.js";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  usuarios = [];
  fechas = {Meses: new Date().getMonth() + 1,Años:new Date().getFullYear()};
  arregloFechas=[]
  datos = [];
  tipoActual = "horizontalBar";
  tipos = ["bar","horizontalBar","line","radar","polarArea","pie","doughnut","bubble"]
  @ViewChild("barCanvas",{static: false}) canvas: ElementRef;
  private chartC: Chart;
  constructor(private screenOrientation: ScreenOrientation,private modalCtrl : ModalController,private userService : UserService) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    userService.listar().subscribe(usuarios=>{
      this.usuarios = usuarios;
      this.calcularSeisMesesAtras(this.fechas.Meses,this.fechas.Años,6);
    })
  }
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    console.log(rgb)
    return rgb;
  }
  dismiss(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //this.modalCtrl.dismiss();
  }
  ngOnInit() {

  }
  dibujarGrafico(){
    console.log();
    var labels = [];
    var datasets = [];
    var mesesG = []
    for(var usuario in this.datos){
      labels.push(usuario)
      var datas = [];
      for(var meses in this.datos[usuario]){
        if(mesesG.indexOf(meses) == -1){
          mesesG.push(meses);
        }
        let data = this.datos[usuario][meses];
        datas.push(Math.round(data) );
      }
      let info = {
        label: usuario,
        backgroundColor: this.random_rgba(),
        data: datas
      }
      datasets.push(info);
    }
    var barChartData = {
      labels: mesesG,
      datasets: datasets
    };
    console.log(barChartData);

    if(this.chartC){
      this.chartC.destroy();
    }

      this.chartC = new Chart(this.canvas.nativeElement,{
          type: this.tipoActual,
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
  traerDatosFiltrados(fechas){
    if(fechas){
        this.fechas = fechas;
    }else{
      fechas = this.fechas;
    }

    let background = ["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"];
    let bordes = ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"];
    var evaluaciones = [];
    var instrumentos = [];
    var labels = [];
    var conjuntos = [];
    var users = this.usuarios;
    //console.log(users);
    //console.log(fechas)
    var usuarios = users.filter(function(usuario){
      return usuario.evaluaciones.length > 0
    });
    var y = fechas.Años;
    var m = fechas.Meses;
    var fecha = new Date(y+"/"+m);
    //console.log(fecha);
    for(var usuario of usuarios){
      var nombre = usuario.firstName +" "+usuario.lastName;
      evaluaciones[nombre] = [];
      conjuntos[nombre] = [];
      var datos = usuario.evaluaciones.filter(function(ev){
        var fechaEv = new Date(ev.fecha);
        var year = fechaEv.getFullYear();
        var month = fechaEv.getMonth() + 1;
        if(month == 3){
          console.log("es el tres");

        }
        return (year == y && month == m && ev.estado === 1)
      })
      //console.log(datos);
      var prom = 0;
      var sum = 0;
      for(var ev of datos){
        let por  = this.getPersonalResultsByEv(ev);
        ev.por = por;
        ev.sigla = ev.instrumento.sigla;
        evaluaciones[nombre].push(ev);
        labels.indexOf(nombre) === -1 ? labels.push(nombre) : '';
        conjuntos[nombre][ev.sigla] = (por);
        sum += por || 0;
      }
      if(datos.length > 0){
        prom  = sum / datos.length
      }
      if(!this.datos[nombre]){
        this.datos[nombre] = [];
      }
      if(!this.datos[nombre][y+"-"+m]){
        this.datos[nombre][y+"-"+m] = [];
      }
      this.datos[nombre][y+"-"+m] = prom;
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
    console.log("datos",this.datos);
    this.dibujarGrafico();
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
  aproximar(datos){
    var data = [];
    for(let i = 0 ; i < datos.length;i++){
      data.push(Math.round(datos[i]));
    }
    return data;
  }
  calcularSeisMesesAtras(mes,year,cantidad){
    this.arregloFechas.push({Meses:mes,Años:year})
    if(mes == 0){
      year = year - 1;
      mes = 11;
    }else{
      mes = mes-1
    }
    if(cantidad>0){
        this.calcularSeisMesesAtras(mes,year,cantidad-1);
    }else{
      console.log("arreglo fechas",this.arregloFechas);
      for(var fechas of this.arregloFechas){
        console.log(fechas);
        this.traerDatosFiltrados(fechas);
      }
    }

  }
}
