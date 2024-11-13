import "@testing-library/jest-dom";
import {pageStore} from "./PageStore";

test ("Page store set valid page", () => {
  pageStore.setCurrentPage(pageStore.Pages.PROBLEMS_LIST);
  expect(pageStore.getCurrentPage()).toBe(pageStore.Pages.PROBLEMS_LIST);

  pageStore.setCurrentPage(pageStore.Pages.DISCUSS)
  expect(pageStore.getCurrentPage()).toBe(pageStore.Pages.DISCUSS);
});

test ("Page store set not valid page", () => {
  pageStore.setCurrentPage(pageStore.Pages.PROBLEMS_LIST);
  expect(pageStore.getCurrentPage()).toBe(pageStore.Pages.PROBLEMS_LIST);
  pageStore.setCurrentPage('че вы думали я тест на русском не напишу?');
  expect(pageStore.getCurrentPage()).toBe(pageStore.Pages.MAIN);
});