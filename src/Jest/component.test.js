//important import
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Provider } from "react-redux";
// import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";

import { mockStore } from "./__mockData__/mockData";

const state = mockStore.getState().auth;
const { name } = state;

test("Footer appearing test", () => {
  render(<Footer />);

  const text = screen.getByText(/© 2023 All Rights Reserved/i);
  expect(text).toBeInTheDocument();
});

describe("header component testing", () => {
  const renderHeader = () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  };

  it("should display user name in header if logged in", async () => {
    renderHeader();
    const elementWithLogout = screen.getByText(/logout/i);
    expect(elementWithLogout).toBeInTheDocument();
  });

  it("should display logout text in header if logged in", async () => {
    renderHeader();
    const elementWithName = screen.getByText(name);
    expect(elementWithName).toBeInTheDocument();
  });
});
