import axios from "axios";
import { BASE_URL, fetchUsers } from "./AxiosTest";
jest.mock("axios");




describe("FetchUser", () => {
  describe("if success", () => {
    it("should return a list of users", async () => {
      // Mock the response data
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];

      // Mock the resolved value of the axios GET request
      axios.get.mockResolvedValueOnce(users);

      // Call the fetchUsers function
      const result = await fetchUsers();

      // Assert the expected behavior
      expect(result).toEqual(users);
    });
  });

  describe("if fails", () => {
    // Add tests for failure scenarios if needed
  });
});
