import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { JwtRequest } from 'src/app/model/jwtRequest';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""

  ngOnInit(): void {
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      this.router.navigate(['components/inicio']);
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });
  }
}


