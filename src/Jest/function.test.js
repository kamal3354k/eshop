import {
  formatCurrency,
  FormDataGeneratorFun,
  getSeverity,
} from "../utlis/index";
import { mockServity } from "./__mockData__/mockData";

describe("formatCurrency", () => {
  it("should be value 1000", () => {
    const value = 1000;
    const result = formatCurrency(value);
    expect(result).toBe("₹1,000.00");
  });
  it("should be value zero", () => {
    const value = 0;
    const result = formatCurrency(value);
    expect(result).toBe(0);
  });
});

describe("FormDataGeneratorFun", () => {
  it("FormData generator", () => {
    const value = { name: "Phone", category: "mobile" };
    const result = FormDataGeneratorFun(value);
    expect(result instanceof FormData).toBe(true);
  });
  it("FormData generator key & value", () => {
    const value = {
      name: "Phone",
      category: "mobile",
      image: new File([""], "zoro.jpg", { type: "image/jpg" }),
    };
    const result = FormDataGeneratorFun(value);
    expect(result.get("name")).toBe("Phone");
    expect(result.get("category")).toBe("mobile");
    expect(result.get("image").name).toBe("zoro.jpg");
  });
});

describe("getSeverity", () => {
  const { product1, product2, product3 } = mockServity;
  it("getSeverity should generate dyanmic className according to inventory Quantity if INSTOCK", () => {
    const result = getSeverity(product1);
    expect(result).toBe("success");
  });
  it("getSeverity should generate dyanmic className according to inventory Quantity if OUTOFSTOCK", () => {
    const result = getSeverity(product2);
    expect(result).toBe("danger");
  });
  it("getSeverity should generate dyanmic className according to inventory Quantity if LOWSTOCK", () => {
    const result = getSeverity(product3);
    expect(result).toBe("warning");
  });
});
