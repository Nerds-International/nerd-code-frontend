import {makeAutoObservable} from "mobx";

class ForumStore {

  /* ================== mock =========================== */
  // topics = Array.from({length: 50}, (_, index) => ({
  //   id: `${index}`,
  //   author: 'RomaZZZ',
  //   time: new Date().toLocaleDateString(),
  //   title: `Topic ${index}`,
  //   text: 'Чето прям спрашиваю много текста здесь',
  //   likes: Math.floor(Math.random() * 1488),
  //   messages: Array.from({length: Math.floor(Math.random() * 5) }, (_, messageIndex) => ({
  //     id: `${messageIndex}`,
  //     author: 'RomaXXX',
  //     time: new Date().toLocaleDateString(),
  //     text: 'Чето отвечаю'
  //   }))
  // }))
  topics = [];

  constructor() {
    makeAutoObservable(this)
  }

  setTopics(newTopics) {
    this.topics = newTopics;
  }

  getTopics = (filter = {}) => {
    let res = this.topics.slice()
    if (filter.messages) res.sort((t1, t2) => {
      return (t1.messages.length - t2.messages.length) * filter.messages
    })
    if (filter.time) {
      const parseDate = (str) => {
        const dateParts = str.split('.').map(p => parseInt(p))
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      }
      res.sort((t1, t2) => {
        return (parseDate(t1.time) - parseDate(t2.time)) * filter.time
      })
    }
    if (filter.likes) res.sort((t1, t2) => {
      return (t1.likes - t2.likes) * filter.likes
    })
    if (filter.title) res = res.filter((t) => t.title.includes(filter.title))
    return res
  }

  addTopic = (topicData) => { // topicData = { author: 'smthng' , title: 'smthng', text: 'smthng' }
    topicData.id = `${this.topics.length}` // mock
    topicData.time = new Date().toLocaleDateString()
    topicData.messages = []
    topicData.likes = 0
    this.topics.push(topicData)
  }

  addValueToTopicLikes = (topicId, value) => {
    this.topics.find(topic => topic.id === topicId).likes += value
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