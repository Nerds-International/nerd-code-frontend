import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import ListTask from "./ListTask";
import problemsStore from "../../store/problem/ProblemsStore";

jest.mock("../../store/auth/AuthStore", () => ({
  authStore: {
    isAuthenticated: false,
  },
}));

describe("ListTask Component", () => {
  beforeEach(() => {
    problemsStore.setTask([
      {
        id: 1,
        name: "Task 1",
        description: "This is the description for task 1",
        difficulty: "Easy",
      },
      {
        id: 2,
        name: "Task 2",
        description: "This is the description for task 2",
        difficulty: "Medium",
      },
      {
        id: 3,
        name: "Task 3",
        description: "This is the description for task 3",
        difficulty: "Hard",
      },
    ]);
  });

  test("renders ListTask component", () => {
    render(
      <MemoryRouter>
        <ListTask tasks={problemsStore.tasks} />
      </MemoryRouter>
    );

    // Проверяем, что задачи отображаются
    expect(
      screen.getByText("Авторизуйтесь, чтобы просматривать и решать задачи!")
    ).toBeInTheDocument();
  });
});
