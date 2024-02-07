// theme-selector.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent {
  constructor(private themeService: ThemeService) { }

  onThemeChange(theme: string): void {
    this.themeService.setCurrentTheme(theme);
  }
}
