import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../servicios/peticiones.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit { 
  ngoninit(): void{
    this.state()

  }




 constructor(private peticion:PeticionesService, private msg:MensajesService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  nombre:string ="cargando..."
  rol:string ="cargando..."
 

state(){
  let post = {
    host:this.peticion.urlLocal,
    path:"/usuarios/state",
    payload: {
    }
  }

    //PETICION
  this.peticion.Post(post.host + post.path , post.payload).then((res:any) => { 
    this.nombre = res.nombre
    this.rol = res.rol 
  })
}

Logout(){
  let post = {
    host:this.peticion.urlLocal,
    path:"/usuarios/logout",
    payload: {
    }
  }

    //PETICION
  this.peticion.Post(post.host + post.path , post.payload).then((res:any) => {
     if(res.state == true){
      this.msg.Load("success",res.mesaje)

     }
              
  })
}

}

