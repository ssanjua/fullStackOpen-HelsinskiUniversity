import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Blog from "./Blog";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

vi.mock("../services/blogs", () => ({
  updateLikes: vi.fn().mockResolvedValue({}),
  deleteBlog: vi.fn().mockResolvedValue({}),
}));

describe("Blog component", () => {
  const blog = {
    author: "Author",
    title: "Blog Title",
    url: "myurl",
    id: "8163716",
    likes: 6318,
  };

  test("renders content", () => {
    render(<Blog addBlog={blog} />);
    const author = screen.getByTestId("blog-author");
    const title = screen.getByTestId("blog-title");
    const url = screen.queryByTestId("blog-url");
    const likes = screen.queryByTestId("blog-likes");

    expect(title).toHaveTextContent("Blog Title");
    expect(author).toHaveTextContent("by Author");
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("show url and likes on button click", async () => {
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByTestId("toggleButton");
    await user.click(button);
    const url = screen.getByTestId("blog-url");
    const likes = screen.getByTestId("blog-likes");
    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });

  test("Like button is clicked twice", async () => {
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByTestId("toggleButton");
    await user.click(button);

    const likeButton = screen.getByTestId("button-like");
    await user.click(likeButton);
    await user.click(likeButton);

    // Espera a que las llamadas a updateLikes se hayan realizado
    await waitFor(() =>
      expect(blogService.updateLikes).toHaveBeenCalledTimes(2),
    );
  });
});
