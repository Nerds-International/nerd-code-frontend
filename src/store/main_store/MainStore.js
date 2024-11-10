import {makeAutoObservable} from "mobx";

class MainStore {

/**
 * MOCK DATA
 */
  news = Array.from({length: 5}, (_, index) => ({
    id: index,
    time: new Date().toLocaleTimeString(),
    title: `News ${index}`,
    text_preview: "Мы добавили BrainF#ck как вы просили!",
    img_src: "../../public/img/news.png",
    news_src: "none"
  }))

  nerds = Array.from({length: 20}, (_, index) => ({
    id: index,
    nickname: "RomanTheNerd52NG",
    img_src: "public/img/nerd.png",
    rating: 1499
  }))

  constructor() {
    makeAutoObservable(this)
  }

  getNews = () => {
    return this.news
  }

  getNerds = () => {
    return this.nerds
  }

/*
  addMessageToTopic = (topicId, message) => {
    const topicIndex = this.topics.findIndex(topic => topic.id === topicId)
    if (topicIndex === -1) {
      console.error(`Cannot add message: Topic with id ${topicId} not found`)
      return
    }
    this.topics[topicIndex].messages.push(message)
  }
*/

}

export const mainStore = new MainStore();