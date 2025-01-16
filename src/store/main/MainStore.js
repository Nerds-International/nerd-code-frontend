import {makeAutoObservable} from "mobx";
import { faker } from '@faker-js/faker';

class MainStore {

/**
 * MOCK DATA
 */
  news = Array.from({length: 5}, (_, index) => ({
    id: index,
    date: new Date().toLocaleDateString(),
    title: `News ${index}`,
    text_preview: "Мы добавили BrainF#ck как вы просили!",
    img_src: "../../public/img/news.png",
    news_src: "none"
  }))

  nerds = Array.from({ length: 10 }, (_, index)  => ({
    id: index,
    nickname: faker.internet.userName(),
    img_src: faker.image.avatar(),
    rating: (10-index)*parseInt(Math.random()*100)
  }));
  constructor() {
    makeAutoObservable(this)
  }

  getNews = () => {
    return this.news
  }

  getNerds = () => {
    return this.nerds
  }

}

export const mainStore = new MainStore();