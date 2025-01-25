import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTopicModal from "./CreateTopicModal";
import "@testing-library/jest-dom/extend-expect";
import { forumStore } from "../../store/forum/ForumStore";

jest.mock("../../store/forum/ForumStore", () => ({
  forumStore: {
    addTopic: jest.fn(),
  },
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
});

global.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

describe("CreateTopicModal", () => {
  let setVisible;

  beforeEach(() => {
    setVisible = jest.fn();
  });

  test("renders CreateTopicModal when visible is true", () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Text of topic")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /OK/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("calls addTopic and resets form on OK button click with valid input", async () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByPlaceholderText("Text of topic"), {
      target: { value: "This is the content of the test topic." },
    });

    fireEvent.click(screen.getByRole("button", { name: /OK/i }));

    await waitFor(() => {
      expect(forumStore.addTopic).toHaveBeenCalled();
    });
  });

  test("resets form and closes modal on Cancel button click", () => {
    render(<CreateTopicModal visible={true} setVisible={setVisible} />);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(setVisible).toHaveBeenCalledWith(false);
  });

  test("does not submit form if fields are empty", async () => {
    render(<CreateTopicModal visible={true} setVisible={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /OK/i }));

    expect(screen.getByPlaceholderText("Title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Text of topic")).toHaveValue("");

    await waitFor(() => {
      expect(forumStore.addTopic).toHaveBeenCalled();
    });
  });

  test("handles API error when creating topic fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Network Error",
      })
    );

    render(<CreateTopicModal visible={true} setVisible={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByPlaceholderText("Text of topic"), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: /OK/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/forums",
        expect.any(Object)
      );
      expect(forumStore.addTopic).toHaveBeenCalled();
    });
  });

  test("resets form after successful topic creation", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: "Test Topic",
            description: "Test Content",
          }),
      })
    );

    const setVisibleMock = jest.fn();
    render(<CreateTopicModal visible={true} setVisible={setVisibleMock} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Topic" },
    });
    fireEvent.change(screen.getByPlaceholderText("Text of topic"), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: /OK/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/forums",
        expect.any(Object)
      );
      expect(forumStore.addTopic).toHaveBeenCalled();
      expect(setVisibleMock).toHaveBeenCalledWith(false);
      expect(screen.getByPlaceholderText("Title")).toHaveValue("");
      expect(screen.getByPlaceholderText("Text of topic")).toHaveValue("");
    });
  });
});
