import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentTheme: string;

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
  }

  setTheme(theme: string): void {
    this.themeService.setCurrentTheme(theme);
    this.currentTheme = theme;
  }
}
