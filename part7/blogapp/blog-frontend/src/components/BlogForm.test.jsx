import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { describe, test, expect, vi } from "vitest";

describe("BlogForm", () => {
  test("calls the event handler with the right details when a new blog is created", async () => {
    const title = "title";
    const author = "ssanju";
    const url = "dkahdjah.com";

    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm addBlog={createBlog} />);

    // Mostrar el formulario
    const button = screen.getByText("create new post");
    await user.click(button);

    const titleInput = screen.getByTestId("input-title");
    const authorInput = screen.getByTestId("input-author");
    const urlInput = screen.getByTestId("input-url");
    const submitBtn = screen.getByTestId("button-submit");

    await user.type(titleInput, title);
    await user.type(authorInput, author);
    await user.type(urlInput, url);

    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(title);
    expect(createBlog.mock.calls[0][0].author).toBe(author);
    expect(createBlog.mock.calls[0][0].url).toBe(url);
  });
});
