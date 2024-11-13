import {forumStore} from './ForumStore'; // Убедитесь, что путь к вашему классу правильный

describe('ForumStore', () => {
  let store;
  beforeEach(() => {
    store = forumStore;
    store.topics = Array.from({length: 50}, (_, index) => ({
      id: `${index}`,
      author: 'RomaZZZ',
      time: new Date().toLocaleDateString(),
      title: `Topic ${index}`,
      text: 'Чето прям спрашиваю много текста здесь',
      likes: Math.floor(Math.random() * 1488),
      messages: []
    }));
  });

  test('getTopics should return topics sorted by messages when filter is applied', () => {
    const filter = { messages: 1 };
    const sortedTopics = store.getTopics(filter);
    expect(sortedTopics[0].messages.length).toBeLessThanOrEqual(sortedTopics[1].messages.length);
  });

  test('getTopics likes ascending sort', () => {
    const filter = { likes: 1 };
    const sortedTopics = store.getTopics(filter);
    expect(sortedTopics[0].likes).toBeLessThanOrEqual(sortedTopics[1].likes);
  });

  test('getTopics likes descending sort', () => {
    const filter = { likes: -1 };
    const sortedTopics = store.getTopics(filter);
    expect(sortedTopics[1].likes).toBeLessThanOrEqual(sortedTopics[0].likes);
  });

  test('getTopics title filter', () => {
    store.topics = Array.from({length: 20}, (_, index) => ({
      id: `${index}`,
      author: '',
      time: new Date().toLocaleDateString(),
      title: `Topic ${index}`,
      text: '',
      likes: 0,
      messages: []
    }));

    store.addTopic({
      author: 'New Author',
      title: 'New',
      text: 'This is a new topic'
    });

    store.addTopic({
      author: 'New Author',
      title: 'New2',
      text: 'This is a new topic'
    });

    const filter = { title: 'ew' };
    const sortedTopics = store.getTopics(filter);
    expect(sortedTopics.length).toBe(2);
  });

  test('addTopic should add a new topic', () => {
    const length = store.topics.length

    const newTopic = {
      author: 'New Author',
      title: 'New Topic',
      text: 'This is a new topic'
    };

    store.addTopic(newTopic);

    expect(store.topics.length).toBe(length + 1);
  });

  test('getTopic should return a correct topic', () => {
    store.topics = []
    const newTopic = {
      author: 'New Author',
      title: 'New Topic',
      text: 'This is a new topic'
    };

    store.addTopic(newTopic);

    const topicId = store.topics[0].id;

    const topic = store.getTopic(topicId);

    expect(topic.author).toBe(newTopic.author);
    expect(topic.title).toBe(newTopic.title);
    expect(topic.text).toBe(newTopic.text);

  });

  test('addValueToTopicLikes should increase likes of a topic', () => {
    const topic = store.topics[0];
    const initialLikes = topic.likes;

    store.addValueToTopicLikes(topic.id, 5);
    expect(topic.likes).toBe(initialLikes + 5);

    store.addValueToTopicLikes(topic.id, -10);
    expect(topic.likes).toBe(initialLikes - 5);
  });


  test('addMessageToTopic should add a message to a topic', () => {
    const topic = store.topics[0];
    const messagesLength = topic.messages.length;
    const messageData = {
      author: 'Message Author',
      text: 'This is a message'
    };

    store.addMessageToTopic(topic.id, messageData);

    expect(topic.messages.length).toBe(messagesLength + 1);
  });
});
