import {makeAutoObservable} from "mobx";
import { faker } from '@faker-js/faker';

class MainStore {

/**
 * MOCK DATA
 */
  news = Array.from({length: 5}, (_, index) => ({
    id: index,
    date: faker.date.recent().toLocaleDateString(),
    title: `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    text_preview: faker.hacker.phrase(),
    img_src: "../../public/img/news.png",
    news_src: faker.internet.url()
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