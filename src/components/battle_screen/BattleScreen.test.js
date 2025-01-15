import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BattleScreen from "./BattleScreen";
import { webSocketStore } from "../../store/socket/WebSocketStore";

jest.mock("../../store/language/LanguageStore", () => ({
  languageStore: {
    getCurrentLanguage: jest.fn().mockReturnValue("javascript"),
  },
}));

jest.mock("../../store/socket/WebSocketStore", () => ({
  webSocketStore: {
    socket: {
      on: jest.fn(),
      emit: jest.fn(),
      id: "mockSocketId",
    },
  },
}));

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("BattleScreen Component", () => {
  test("renders BattleScreen component", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Перевернуть")).toBeInTheDocument();
    expect(screen.getByText("Подглядеть")).toBeInTheDocument();
    expect(screen.getByText("Стереть 10 символов")).toBeInTheDocument();
    expect(screen.getAllByText("Run").length).toBe(2);
  });

  test("CodeEditor onChange event updates state correctly", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );

    const codeEditors = screen.getAllByRole("textbox");

    fireEvent.change(codeEditors[0], { target: { value: "new code 1" } });
    await waitFor(() => expect(codeEditors[0]).toHaveValue("new code 1"));
  });

  test("syncCode emits syncCode event", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );

    const codeEditors = screen.getAllByRole("textbox");
    fireEvent.change(codeEditors[0], { target: { value: "new code 1" } });

    fireEvent.change(codeEditors[1], { target: { value: "new code 2" } });

    await waitFor(() => {
      expect(webSocketStore.socket.emit).toHaveBeenCalledWith("syncCode", {
        battleId: "mockBattleId",
        code: "new code 1",
      });
    });
  });
  test("applyLag sets lagCount state", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );

    const lagButton = screen.getByText("Подглядеть");
    fireEvent.click(lagButton);

    await waitFor(() => {
      expect(screen.getByText("Стереть 10 символов")).toBeInTheDocument();
    });
  });

  test("eraseCharacters sets code2 state", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );

    const eraseButton = screen.getByText("Стереть 10 символов");
    fireEvent.click(eraseButton);

    await waitFor(() => {
      const codeEditors = screen.getAllByRole("textbox");
      expect(codeEditors[1]).toHaveValue("");
    });
  });

  test("renders EnergyBar component", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/battle", state: { battleId: "mockBattleId" } },
        ]}
      >
        <Routes>
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </MemoryRouter>
    );
  });
});
