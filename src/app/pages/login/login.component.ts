import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from 'src/app/services/api.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario;
  resAutenticacao: any = null;
  usuarioOuSenhaInvalido: boolean = false;
  
  constructor(private router: Router, private api: Api) { 
    if (!!localStorage.getItem('token')){
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    
  }

  async login() {
    this.resAutenticacao = await this.api.autenticar(this.usuario);
    if(this.resAutenticacao.access_token != undefined) {
      localStorage.setItem('token', this.resAutenticacao.access_token);
      this.router.navigate(['/dashboard']);
    } else {
      this.usuarioOuSenhaInvalido = true;
    }
    
  }


}
