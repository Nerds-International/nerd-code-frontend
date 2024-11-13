import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BattleScreen from "./BattleScreen";

jest.mock("../../store/language/LanguageStore", () => ({
    languageStore: {
        getCurrentLanguage: jest.fn().mockReturnValue("javascript"),
    },
}));

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
});
