import { Component } from '@angular/core';
import { PeticionesService } from '../../servicios/peticiones.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private peticion:PeticionesService,
    private msg:MensajesService,
    private router:Router){}

  email:string = ""
  password:string =""

  iniciarsesion(){
    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/Login",
      payload: {
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
          this.router.navigate(["/dashboard"])
        }
        
      })
  }
}


