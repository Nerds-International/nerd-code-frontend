import {makeAutoObservable} from "mobx";

class ForumStore {

  // mock data
  topics = Array.from({length: 50}, (_, index) => ({
    id: index,
    author: 'RomaZZZ',
    time: new Date().toLocaleTimeString(),
    title: `Topic ${index}`,
    text: 'Чето прям спрашиваю много текста здесь',
    messages: Array.from({length: Math.floor(Math.random() * 5) }, (_, messageIndex) => ({
      id: messageIndex,
      author: 'RomaXXX',
      time: new Date().toLocaleTimeString(),
      text: 'Чето отвечаю'
    }))
  }))

  constructor() {
    makeAutoObservable(this)
  }

  getTopics = () => {
    return this.topics
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

export const forumStore = new ForumStore();