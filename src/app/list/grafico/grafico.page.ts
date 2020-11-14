import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from '../../_servicios/user.service';
import { ExportExcelService } from '../../_servicios/export-excel.service';
import { EvaluacionesService } from '../../_servicios/evaluaciones.service';
import { Chart } from "chart.js";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  evaluacion = undefined;
  indicadores = []
  titulo = [];
  intrumentoTitulos = [];
  porcentajes = [];
  tipoGeneral = undefined;
  tipos = ["bar","horizontalBar"]
  tipoActual = "bar";
  totalData = [];
  datasets = [];
  titulos = []
  valores = []
  nombreInstrumento = "Sin nombre";
  colores = []
  fondos = []
  @ViewChild("graficoCanvas",{static: false}) grafico: ElementRef;
  private chart: Chart;

  constructor(
    public ete: ExportExcelService,
    private alertController: AlertController,
    private router : Router,
    private location:Location,
    public evaluacionesService : EvaluacionesService,
    public userService:UserService) {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));    
    var instrumento = this.evaluacionesService.getInstrumento();
    if(!instrumento){
      this.router.navigate(['/home']);
    }
    this.nombreInstrumento = instrumento['nombre'] || instrumento['titulo'];
    if(usuario.permissionLevel > 4){
        this.traerTodos(instrumento);
    }else{
        this.traerDatos();
    }

  }
  public random_rgba() {
    var o = Math.round, r = Math.random, s = 200;
    //var rgb = 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    var rgb = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.5)'
    return rgb;
  }
  
  ngOnInit(){
  }
  dismiss() {
    this.location.back();
  }
  calcular(instrumento){

  }
  generarExcelEvaluaciones(){    
    console.log(this.totalData);
    console.log(this.intrumentoTitulos)
    var usuarios = Object.keys(this.totalData);
    var data = [];
    
    usuarios.map(usuario=>{
      
      let obj = {Usuario : usuario};
      var instrumentos = this.totalData[usuario];      
      var i = 0;
      for(var ins in instrumentos){
        obj['Indicador '+(i+1)] = instrumentos[ins];
        i++;
      }
      
      data.push(obj);
    })
    console.log(data);
    
    var dataForExcel = [];   
    data.map(row=>{
      dataForExcel.push(Object.values(row))
    })    

    let reportData = {
      title: 'Evaluacion por usuario ('+this.nombreInstrumento+')',
      data: dataForExcel,
      instrumentos : this.intrumentoTitulos,
      headers: Object.keys(data[0])
    }

    this.ete.exportExcelEvaluaciones(reportData);
    
  }
   async abrirExportarEvaluaciones() {
    const alert = await this.alertController.create({      
      header: 'Quieres exportar!',
      message: 'Va a generar un <strong>excel</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Exportar',
          handler: () => {
            this.generarExcelEvaluaciones();
          }
        }
      ]
    });

    await alert.present();
  }
  traerTodos(instrumento){
    console.log(instrumento);
    var promedios = []
    var data = [];
    this.userService.listar().subscribe(datos=>{
      var usuarios = datos;
      var objetos = [];
      for(let i = 0 ; i < usuarios.length; i++){
        this.tipoGeneral = this.evaluacionesService.getTipo();
        var tipo = this.tipoGeneral.toLowerCase();

        let obj = usuarios[i][tipo];
        obj
        if(tipo == "encuestas" && obj){
          for(let o of obj){
            if(o.id == instrumento.id){
                objetos.push(o);
            }
          }
        }
        if(tipo == "evaluaciones" && obj){
          for(let o of obj){
            if(o.estado == 1){
              if(o.instrumento.sigla == instrumento.sigla){
                  o.usuario = usuarios[i];
                  if(this.titulo.indexOf(usuarios[i].firstName) == -1){
                    this.titulo.push(usuarios[i].firstName);
                  }
                  objetos.push(o);
              }
            }
          }
        }
      }
      console.log(objetos);

      if(tipo== "encuestas"){
        var valores = []
        var cantidadReal = 0;
        for(let i = 0 ; i < objetos.length;i++){
          labels = [];
          var preguntas = objetos[i].preguntas;
          for(let p of preguntas){
            labels.push(p.titulo);
          }
          var resultados = objetos[i].resultados;
          if(resultados){
            cantidadReal ++;
            for(let j = 0 ; j < resultados.length ; j++){
              if(!promedios[j]){
                  promedios[j] = 0;
              }
              promedios[j] += resultados[j];
            }
          }
        }
        this.titulos = labels;
        for(var i = 0 ; i < promedios.length ; i++){
          var arr = []
          for(var j= 0 ; j < promedios.length ; j++){
            arr[j] = 0;
          }
          arr[i] = ( promedios[i] / cantidadReal ).toFixed(1) ;

          var set = {
              label: (i+1)+'º',
              data: arr,
              backgroundColor: this.random_rgba(),
              borderColor: this.random_rgba(),
            }
          this.datasets.push(set);
        }
        this.ngAfterViewInit();

      }else{
        var valores = [];
        var labels = [];
        var cantidadReal = 0;
        for(var evaluacion of objetos){
          var ins = evaluacion.instrumento;
          var indicadores = ins.indicadores;
          if(indicadores){
            cantidadReal++;
            for(let i = 0 ; i < indicadores.length ; i++){
              var indicador = indicadores[i];
              if(indicador && indicador.valor){
                var tamMax = 7;
                if(labels.indexOf(indicador.titulo.substring(0, tamMax)) == -1){
                    labels.push(indicador.titulo.substring(0, tamMax));
                    this.intrumentoTitulos.push(indicador.titulo)                    
                }
                if(!promedios[i]){
                  promedios[i] = 0;
                }
                let nombre = evaluacion.usuario.firstName +" "+ evaluacion.usuario.lastName;
                if(!data[nombre]){
                  data[nombre] = [];
                }
                data[nombre][indicador.titulo.substring(0, tamMax)] = indicador.valor;
                promedios[i] += indicador.valor;
                valores.push(indicador.valor);

              }
            }
          }
        }
        
        this.totalData = data;
        
        this.titulos = Object.keys(data);

        for(var us in data){
          var usuario = data[us];
          var values = Object.values(usuario);
          var valorProm = [];
          for(var i = 0 ; i < values.length ; i++){
            var porcentaje = parseFloat(values[i].toString()) / cantidadReal;
            var por = promedios[i] / cantidadReal;
            this.porcentajes.push(Math.round(por));
            var puntosTotales = (parseFloat(values[i].toString())*100 )/porcentaje;
            valorProm.push(Math.round(parseFloat(values[i].toString()) * 100 / puntosTotales))
          }
          var set = {
            label: us,
            data: valorProm,
            backgroundColor: this.random_rgba(),
            borderColor: this.random_rgba(),
          }
          this.titulos = Object.keys(usuario);
          this.datasets.push(set);
        }

      }

      //console.log(objetos)
      this.ngAfterViewInit();
    })
  }
  traerDatos(){
    console.log("trae datos");

    this.evaluacion = this.evaluacionesService.getInstrumento();
    if(this.evaluacion.instrumento){
      this.titulo.push(this.evaluacion.instrumento.nombre)
      if(this.evaluacion.instrumento.indicadores){
        this.indicadores = this.evaluacion.instrumento.indicadores;
        for(let i = 0 ; i  < this.indicadores.length;i++){
          let indicador = this.indicadores[i];
          var arr = []
          for(var j= 0 ; j < this.indicadores.length ; j++){
            arr[j] = 0;
          }
          arr[i] = indicador.valor;
          var set = {
              label: (i+1)+'º',
              data: arr,
              backgroundColor: this.random_rgba(),
              borderColor: this.random_rgba(),
            }
          this.datasets.push(set);
          this.titulos.push(indicador.titulo);
        }

      }
    }
    if(this.evaluacion.preguntas){
      for(let i = 0 ; i < this.evaluacion.preguntas.length;i++){
        let pregunta = this.evaluacion.preguntas[i];

        var arr = []
        for(var j= 0 ; j < this.evaluacion.preguntas.length ; j++){
          arr[j] = 0;
        }
        arr[i] = this.evaluacion.resultados[i];
        var set = {
            label: (i+1)+'º',
            data: arr,
            backgroundColor: this.random_rgba(),
            borderColor: this.random_rgba(),
          }
        this.datasets.push(set);
        this.titulos.push(pregunta.titulo);
      }
    }
  }
  getBody(bodyItem) {
      return bodyItem.lines;
  }
  ngAfterViewInit() {    
    var self = this;
    var tipo = this.evaluacionesService.getTipo().toLowerCase();
    if(this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart(this.grafico.nativeElement,{
      type: this.tipoActual,
      data: {

        labels: this.titulos,
        datasets: this.datasets
      },
      options: {
        tooltips: {
            // Disable the on-canvas tooltip
            enabled: false,

            custom: function(tooltipModel) {
              if(tipo != "encuestas"){
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');

                // Create element on first render
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<table></table>';
                    document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = '0';
                    return;
                }

                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                // Set Text
                if (tooltipModel.body) {
                    var titleLines = tooltipModel.title || [];
                    var bodyLines = tooltipModel.body.map(self.getBody);

                    var innerHtml = '<thead>';

                    titleLines.forEach(function(title) {
                        for(var i = 0; i <  self.intrumentoTitulos.length ; i++){
                          var titulo = self.intrumentoTitulos[i];
                          var porcentaje = self.porcentajes[i];
                          if(titulo.startsWith(title)){
                              innerHtml += '<tr><th>' + titulo +' ('+porcentaje+'%)</th></tr>';
                          }
                        }

                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background:' + colors.backgroundColor;
                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + body + '%</td></tr>';
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                var position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = '1';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
            }
          }
        },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    min : 0
                }
            }],
            xAxes:[
              {
                stacked: true,
                ticks:{
                  min : 0,
                  max : (tipo == "encuestas") ? 5 : 100
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
      //console.log(canvas);
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
