import { Component } from '@angular/core';
import { PeticionesService } from '../../servicios/peticiones.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion:PeticionesService,private msg:MensajesService){}

  nombre:string =""
  email:string = ""
  password:string =""

  registrar(){
    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/Guardar",
      payload: {
        nombre:this.nombre,
        email:this.email,
        password:this.password

      }
    }

    //PETICION
      this.peticion.Post(post.host + post.path , post.payload).then((res:any) => {
        if(res.state == false){
          this.msg.Load("danger",res.mensaje)
        }
        else {
          this.msg.Load("success",res.mensaje)
        }
        
      })
  }
}
