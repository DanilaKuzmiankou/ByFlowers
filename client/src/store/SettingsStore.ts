import { makeAutoObservable } from 'mobx'

class SettingsStore {
  isMobileNavbarMenuOpen: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsMobileNavbarMenuOpen(isNavbarMenuOpen: boolean) {
    this.isMobileNavbarMenuOpen = isNavbarMenuOpen
  }
}

export default new SettingsStore()
