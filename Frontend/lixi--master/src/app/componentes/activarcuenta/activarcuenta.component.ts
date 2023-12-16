import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from '../../servicios/peticiones.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-activarcuenta',
  templateUrl: './activarcuenta.component.html',
  styleUrl: './activarcuenta.component.css'
})
export class ActivarcuentaComponent implements OnInit{

  constructor(
    private actroute:ActivatedRoute,
    private peticion:PeticionesService,
    private msg:MensajesService,
    private router:Router) {}
  email:string ="" 
  codigo:string =""
  ngOnInit(): void {
    this.email = this.actroute.snapshot.params["email"]
    this.codigo = this.actroute.snapshot.params["codigo"]
   console.log(this.email)
  }

  Activar () {
    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/activarcuenta",
      payload: {
        email:this.email,
        codigo:this.codigo
      }
    }

    //PETICION
      this.peticion.Post(post.host + post.path , post.payload).then((res:any) => {
        if(res.state == false){
          this.msg.Load("danger",res.mensaje)
        }
        else{
          this.msg.Load("success",res.mensaje)
          this.router.navigate(["/login"])
        }
       
        
      })
  }
}
