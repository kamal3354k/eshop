import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../redux/services/product";
import CreateAndUpdateForm from "../components/form/CreateAndUpdateForm";
import "@testing-library/jest-dom/extend-expect";
import { formSubmitMockData } from "./__mockData__/mockData";



jest.mock("../redux/services/product", () => ({
  useAddProductMutation: jest.fn(),
  useUpdateProductMutation: jest.fn(),
}));

const setupTest = () => {
  const mockAddProductMutation = jest.fn();
  const mockUpdateProductMutation = jest.fn();

  useAddProductMutation.mockReturnValue([mockAddProductMutation]);
  useUpdateProductMutation.mockReturnValue([mockUpdateProductMutation]);

  return { mockAddProductMutation };
};

test("submits the form with entered values for new product", async () => {
  // Arrange
  const { mockAddProductMutation } = setupTest();
  const setProductDialog = jest.fn();
  const callSearchMutationFunction = jest.fn();
  mockAddProductMutation.mockResolvedValue({});

  render(
    <CreateAndUpdateForm
      productDialog={{ value: true, lastClick: "NEW" }}
      setProductDialog={setProductDialog}
      hideDialog={jest.fn()}
      product={{}}
      setProduct={jest.fn()}
      callSearchMutationFunction={callSearchMutationFunction}
    />
  );

  // Act
  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: formSubmitMockData.name },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: formSubmitMockData.description },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter Product Price..."), {
    target: { value: formSubmitMockData.price },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter Product Quantity..."), {
    target: { value: formSubmitMockData.quantity },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter Product Quantity..."), {
    target: { value: formSubmitMockData.quantity },
  });

  const radioButtons = screen.getAllByRole("radio");

  fireEvent.click(radioButtons[0], { target: { checked: true } });
  const dialog = screen.getByText(/Add Product Details/i);

  fireEvent.click(screen.getByText(/Save/i));

  await new Promise((resolve) => setTimeout(resolve)); // Wait for async operations to complete

  expect(dialog).toBeInTheDocument();
  const mockAddProductMutationArgs = mockAddProductMutation.mock.calls[0][0];
  expect(mockAddProductMutationArgs.description).toBe(formSubmitMockData.description);
  expect(mockAddProductMutationArgs.price).toBe(formSubmitMockData.price);
  expect(mockAddProductMutationArgs.quantity).toBe(formSubmitMockData.quantity);
  expect(mockAddProductMutationArgs.category).toBe(formSubmitMockData.category);
});
