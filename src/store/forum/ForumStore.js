import {makeAutoObservable} from "mobx";

class ForumStore {

  /* ================== mock =========================== */
  topics = Array.from({length: 50}, (_, index) => ({
    id: `${index}`,
    author: 'RomaZZZ',
    time: new Date().toLocaleTimeString(),
    title: `Topic ${index}`,
    text: 'Чето прям спрашиваю много текста здесь',
    messages: Array.from({length: Math.floor(Math.random() * 5) }, (_, messageIndex) => ({
      id: `${messageIndex}`,
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

  addTopic = (topicData) => { // topicData = { author: 'smthng' , title: 'smthng', text: 'smthng' }
    topicData.id = `${this.topics.length}` // mock
    topicData.time = new Date().toLocaleTimeString()
    topicData.messages = []
    this.topics.push(topicData)
  }

  getTopic = (topicId) => {
    return this.topics.find(topic => topic.id === topicId)
  }

  addMessageToTopic = (topicId, messageData) => {
    const topicIndex = this.topics.findIndex(topic => topic.id === topicId)
    messageData.id = this.topics[topicIndex].messages.length
    this.topics[topicIndex].messages.push(messageData)
  }

}

export const forumStore = new ForumStore();