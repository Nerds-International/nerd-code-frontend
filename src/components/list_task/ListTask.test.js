import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import ListTask from "./ListTask";
import problemsStore from "../../store/problem/ProblemsStore";
import { authStore } from "../../store/auth/AuthStore";

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

  test("renders ListTask component for unauthenticated user", () => {
    render(
      <MemoryRouter>
        <ListTask tasks={problemsStore.tasks} />
      </MemoryRouter>
    );

    // Проверяем, что сообщение для неавторизованных пользователей отображается
    expect(
      screen.getByText("Авторизуйтесь, чтобы просматривать и решать задачи!")
    ).toBeInTheDocument();
  });

  test("renders ListTask component for authenticated user", () => {
    authStore.isAuthenticated = true;

    render(
      <MemoryRouter>
        <ListTask tasks={problemsStore.tasks} />
      </MemoryRouter>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();

    expect(screen.getAllByText("View Task")).toHaveLength(3);
  });
});
