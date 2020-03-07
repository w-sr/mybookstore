import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from "./shared/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from './components/message-box/message-box.component';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = true;
  animal: string;
  name: string;
  show = true;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    if (window.innerWidth < 768) {
      // this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      // this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      // this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      // this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  signOut(): void {
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      width: '250px',
      data: {message: "Do you want to sign out?"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.authService.SignOut()
      }
    });
  }

  click() {
    this.show = !this.show;
  }
}