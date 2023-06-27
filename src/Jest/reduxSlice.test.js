import authReducer, { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";

describe("Auth Slice", () => {
  test("SET_ACTIVE_USER action should update the state with user data", () => {
    const initialState = {
      isLoggedIn: false,
      id: null,
      name: null,
      email: null,
    };

    const user = {
      displayName: "John Doe",
      uid: "12345",
      email: "johndoe@example.com",
    };

    const action = {
      type: SET_ACTIVE_USER.type,
      payload: user,
    };

    const nextState = authReducer(initialState, action);

    expect(nextState.isLoggedIn).toBe(true);
    expect(nextState.id).toBe(user.uid);
    expect(nextState.name).toBe(user.displayName);
    expect(nextState.email).toBe(user.email);
  });

  test("REMOVE_ACTIVE_USER action should reset the state", () => {
    const currentState = {
      isLoggedIn: true,
      id: "12345",
      name: "John Doe",
      email: "johndoe@example.com",
    };

    const action = {
      type: REMOVE_ACTIVE_USER.type,
    };

    const nextState = authReducer(currentState, action);

    expect(nextState.isLoggedIn).toBe(false);
    expect(nextState.id).toBe(null);
    expect(nextState.name).toBe(null);
    expect(nextState.email).toBe(null);
  });
});
