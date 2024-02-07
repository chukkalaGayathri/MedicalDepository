// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject: BehaviorSubject<string>;

  constructor() {
    // Initialize the current theme as 'default'
    this.currentThemeSubject = new BehaviorSubject<string>('default');
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }

  setCurrentTheme(theme: string): void {
    this.currentThemeSubject.next(theme);
    console.log(this.currentThemeSubject);
    console.log("settheme is called")
  }

  getThemeObservable() {
    return this.currentThemeSubject.asObservable();
  }
}
