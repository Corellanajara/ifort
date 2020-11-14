
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }
  exportExcelEvaluaciones(excelData){
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const instrumentos = excelData.instrumentos;
    const data = excelData.data;
    
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte ifort');


    //Add Row and formatting
    worksheet.mergeCells('A1', 'D4');
    let titleRow = worksheet.getCell('C1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('G1:H4');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('G1');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }    

    //Blank Row 
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })    
    for(var i = 1 ; i <= header.length ; i++){
      worksheet.getColumn(i).width = 40;
    }
    
    worksheet.addRow([]);

     // Adding Data 
    data.forEach(d => {
      let row = worksheet.addRow(d);      
      }
    );
    
    worksheet.addRow([]);
    // Leyend row
    var i = 1;
    instrumentos.map(instrumento=>{
      worksheet.addRow(["Indicador "+(i) +" : "+instrumento]);      
      i++;
    })
    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(['Reporte generado en ifort.cl (' + date+')']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' }
    };
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:D${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })


  }
  exportExcel(excelData) {        
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;
    
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte ifort');


    //Add Row and formatting
    worksheet.mergeCells('A1', 'D4');
    let titleRow = worksheet.getCell('C1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('G1:H4');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('G1');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }    

    //Blank Row 
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })    
    for(var i = 1 ; i <= header.length ; i++){
      worksheet.getColumn(i).width = 40;
    }
    
    worksheet.addRow([]);

     // Adding Data with Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);      
      }
    );
    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(['Reporte generado en ifort.cl (' + date+')']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' }
    };
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:D${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }

}
