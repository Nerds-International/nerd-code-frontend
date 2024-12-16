import "@testing-library/jest-dom";
import {mainStore} from "./MainStore";

describe('MainStore',() => {

  test('getNerds',() => {
    expect(mainStore.getNerds() === mainStore.nerds)
  })

  test('getNews', () => {
    expect(mainStore.getNews() === mainStore.news)
  })
})