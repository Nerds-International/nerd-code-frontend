import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BattleScreen from "./BattleScreen";

jest.mock("../../store/language/LanguageStore", () => ({
    languageStore: {
        getCurrentLanguage: jest.fn().mockReturnValue("javascript"),
    },
}));

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

describe("BattleScreen Component", () => {
    test("renders BattleScreen component", () => {
        render(<BattleScreen />);
        expect(screen.getByText("Описание задачи")).toBeInTheDocument();
        expect(screen.getByText("Перевернуть")).toBeInTheDocument();
        expect(screen.getByText("Невидимость")).toBeInTheDocument();
        expect(screen.getByText("Стереть 10 символов")).toBeInTheDocument();
        expect(screen.getAllByText("Test").length).toBe(2);
        expect(screen.getAllByText("Run").length).toBe(2);
    });

    test("CodeEditor onChange event updates state correctly", () => {
        render(<BattleScreen />);

        const codeEditors = screen.getAllByRole("textbox");

        fireEvent.change(codeEditors[0], { target: { value: "new code 1" } });
        expect(codeEditors[0]).toHaveValue("new code 1");

        fireEvent.change(codeEditors[1], { target: { value: "new code 2" } });
        expect(codeEditors[1]).toHaveValue("new code 2");
    });
});
