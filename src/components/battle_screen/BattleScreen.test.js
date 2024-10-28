import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BattleScreen from "./BattleScreen";

jest.mock("../../store/LanguageStore", () => ({
  languageStore: {
    getCurrentLanguage: jest.fn().mockReturnValue("javascript"),
  },
}));

describe("BattleScreen", () => {
  it("renders BattleWindows", () => {
    render(<BattleScreen />);

    expect(screen.getByText(/Code Block 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Code Block 2/i)).toBeInTheDocument();
  });
});

describe("BattleWindows", () => {
  it("updates code block 1 textarea and syntax highlighter", () => {
    render(<BattleScreen />);

    const textarea1 = screen.getByRole("textbox", { name: "Code Block 1" });
    fireEvent.change(textarea1, {
      target: { value: 'console.log("Hello World");' },
    });

    expect(textarea1.value).toBe('console.log("Hello World");');
    expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument();
  });

  it("updates code block 2 textarea and syntax highlighter", () => {
    render(<BattleScreen />);

    const textarea2 = screen.getByRole("textbox", { name: "Code Block 2" });
    fireEvent.change(textarea2, {
      target: { value: 'function greet() { return "Hi!"; }' },
    });

    expect(textarea2.value).toBe('function greet() { return "Hi!"; }');
    expect(
      screen.getByText('function greet() { return "Hi!"; }'),
    ).toBeInTheDocument();
  });
});
