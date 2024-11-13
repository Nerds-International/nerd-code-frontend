import {makeAutoObservable} from "mobx";

class PageStore {
  /**
   * enum для названий страниц
   */
  Pages = {
    PROBLEMS_LIST: 'problems-list-page',
    DISCUSS: 'discuss-page',
    BATTLE: 'battle-page',
    MAIN: 'main-page',
  }

  availablePages = [
    this.Pages.MAIN,
    this.Pages.BATTLE,
    this.Pages.DISCUSS,
    this.Pages.PROBLEMS_LIST
  ]

  currentPage = this.Pages.MAIN

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentPage = (pageName) => {
    if (this.availablePages.findIndex(v => v === pageName) === -1) {
      this.currentPage = this.Pages.MAIN;
    } else {
      this.currentPage = pageName;
    }
  }

  getCurrentPage = () => {
    return this.currentPage;
  }

}

export const pageStore = new PageStore();
