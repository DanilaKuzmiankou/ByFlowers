import { makeAutoObservable } from 'mobx'

class SettingsStore {
  isMobileNavbarMenuOpen: boolean = false

  bottomBarHeight: number = 0

  navbarHeight: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  setIsMobileNavbarMenuOpen(isNavbarMenuOpen: boolean) {
    this.isMobileNavbarMenuOpen = isNavbarMenuOpen
  }

  setBottomBarHeight(bottomBarHeight: number) {
    this.bottomBarHeight = bottomBarHeight
  }

  setNavbarHeight(navbarHeight: number) {
    this.navbarHeight = navbarHeight
  }
}

export default new SettingsStore()
