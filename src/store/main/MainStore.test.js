import "@testing-library/jest-dom";
import {mainStore} from "./MainStore";

describe('MainStore',() => {

  test('getNerds',() => {
    expect(mainStore.getNerds() === mainStore.nerds).toBe(true)
  })

  test('getNews', () => {
    expect(mainStore.getNews() === mainStore.news).toBe(true)
  })
})