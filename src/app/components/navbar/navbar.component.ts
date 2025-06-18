import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public router: Router, public storageService: StorageService) {}

  get isLogged(): boolean {
    return !!this.storageService.getSession('token');
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/login']);
  }

  get username(): string {
    return this.storageService.getSession('user') || '';
  }

  irAHome() {
  this.router.navigate(['/home']);
}

}
