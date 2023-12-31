import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Temper } from 'src/app/model/temper';
import { TemperService } from 'src/app/services/temper.service';

@Component({
  selector: 'app-buscar-temper',
  templateUrl: './buscar-temper.component.html',
  styleUrls: ['./buscar-temper.component.css']
})
export class BuscarTemperComponent implements OnInit{
  dataSource:MatTableDataSource<Temper> = new MatTableDataSource<Temper>();
  fechaForm : FormGroup = new FormGroup({});
  mensaje: string= '';
  fechaVacia:boolean = false;

  displayedColums: string[] = ['codigo','temperamento','genero'];

  constructor(private tS:TemperService,private formBuilder:FormBuilder){  }

  ngOnInit(): void {
      this.fechaForm = this.formBuilder.group({
        fecha: [null,Validators.required],
      });
  }

  buscar(){
    if(this.fechaForm.valid){
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0,10);
      this.tS.buscar(fechas).subscribe((data)=>{
        this.dataSource.data=data;
        if(data.length===0){
          this.mensaje=" No se encontraron resultados para la fecha seleccionada.";
        }else{
          this.mensaje='';
        }
      });
    }else{
      if(this.fechaForm.get('fecha')?.hasError('required')){
         this.mensaje='ingrese fecha' 
      }
    }
  }

  obtenerControlCampo(nombreCampo:string):AbstractControl{
    const control = this.fechaForm.get(nombreCampo);
    if(!control){
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
