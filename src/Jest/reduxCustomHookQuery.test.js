import { renderHook } from "@testing-library/react-hooks";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../redux/services/product";
import { mockProductData } from "./__mockData__/mockData";

jest.mock("../redux/services/product", () => ({
  useGetAllProductsQuery: jest.fn(),
  useDeleteProductMutation: jest.fn(),
}));

describe("Redux Query custom hook", () => {
  it("useGetAllProductsQuery retrieves all products", async () => {
    useGetAllProductsQuery.mockReturnValueOnce(mockProductData);

    const { result } = renderHook(() => useGetAllProductsQuery());

    expect(result.current.data[0].name).toBe("luffy");
    expect(result.current.data[0].category).toBe("fitness");
    expect(result.current.data[0].quantity).toBe(1);
    expect(result.current.data[0].price).toBe(1000);
    expect(result.current.data[0].inventoryStatus).toBe("LOWSTOCK");
  });
  it("useGetAllProductsQuery retrieves all products", async () => {
    const productId = "64918c5b48f8f38ae1f30854";

    useDeleteProductMutation.mockReturnValueOnce({
      message: "Successfully Deleted",
      status: 400,
    });

    const { result } = renderHook(() => useDeleteProductMutation(productId));

    expect(result.current.message).toBe("Successfully Deleted");
    expect(result.current.status).toBe(400);
  });
});
