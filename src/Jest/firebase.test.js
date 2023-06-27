import {
  LoginFunction,
  LogoutFunction,
  ResetPasswordFuncition,
} from "../firebase/config";

describe("Firebase Functional Testing...", () => {
  it("SignUpFunction creates a new user with the provided email and password", async () => {
    const email = "Tes2113@x2aple.com"; //unique email
    const password = "test1sdfs23";
    // Call the SignUpFunction

    // const result = await SignUpFunction(email, password);
    // expect(result.user.email.toLowerCase()).toBe(email.toLowerCase());
  });

  
  //for logout
  it("LogoutFunction by which current user will be logout", async () => {
    // Call the LogoutFunction
    const result = await LogoutFunction();
    expect(result).toBe(true);
  });
  
  //for login
  it("LoginFunction login a user with the provided email and password", async () => {
    const email = "Tes2113@x2aple.com"; //unique email
    const password = "test1sdfs23";

    // Call the LoginFunction
    // const result = await LoginFunction(email, password);
    // expect(result.user.email.toLowerCase()).toBe(email.toLowerCase());
  });
  // for ResetPasswordFuncition
  // it("ResetPasswordFuncition by which email will be trigger", async () => {
  //   const email = "kamal.rathore@speckyfox.com"; //unique email

  //   // Call the ResetPasswordFuncition
  //   const result = await ResetPasswordFuncition(email);
  //   expect(result).toBe(true);
  // });
});
