export class ThemeManager {
  static instance: ThemeManager
  protected THEME_MODE_KEY = 'theme-mode'
  private mode: ThemeMode
  private constructor() {
    this.mode = (localStorage.getItem(this.THEME_MODE_KEY) ??
      'light') as ThemeMode
    document.documentElement.dataset.themeMode = this.mode
  }
  public static getInstance(): ThemeManager {
    if (!this.instance) {
      this.instance = new ThemeManager()
    }

    return this.instance
  }

  public getMode(): ThemeMode {
    return this.mode
  }
  public setMode(mode: ThemeMode): ThemeMode {
    this.mode = mode

    document.documentElement.dataset.themeMode = mode
    localStorage.setItem(this.THEME_MODE_KEY, this.mode)

    return mode
  }
}
