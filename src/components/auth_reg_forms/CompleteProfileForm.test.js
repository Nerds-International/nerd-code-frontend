import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CompleteProfileForm from "./CompeteProfileForm"; // Убедитесь, что путь к компоненту правильный

// Mock `window.matchMedia`
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe("CompleteProfileForm Component", () => {
    test("renders form elements and text", () => {
        render(<CompleteProfileForm />);

        // Проверка заголовка формы
        expect(screen.getByText("Complete Your Profile")).toBeInTheDocument();

        // Проверка наличия полей ввода
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Avatar")).toBeInTheDocument();

        // Проверка наличия кнопки
        expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    });

    test("accepts input and submits form when all fields are filled", () => {
        render(<CompleteProfileForm />);

        // Заполнение полей ввода
        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Test User" } });

        // Выбор аватара
        fireEvent.mouseDown(screen.getByLabelText("Avatar")); // Открываем выпадающий список
        fireEvent.click(screen.getByText("Avatar 1")); // Выбираем первый аватар

        // Согласие с условиями
        fireEvent.click(screen.getByLabelText(/i have read and agree with the terms of service and code of conduct/i));

        // Отправка формы
        fireEvent.click(screen.getByRole("button", { name: "Create account" }));

        // Здесь можно добавить дополнительные проверки, если необходимо
    });
});