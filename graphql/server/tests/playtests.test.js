import { getFirstName, isValidPassword } from "../src/utils/user";

test("Should return first name from full name", () => {
  const firstName = getFirstName("Pookie Hounds");
  //   if (firstName !== "Pookie") throw new Error("Pooks!");

  expect(firstName).toBe("Pookie");
});

test("Should return first name even when no last name is provided", () => {
  const firstName = getFirstName("Pooks");
  expect(firstName).toBe("Pooks");
});

test("Should check if provided password is greater than 8 characters", () => {
  const isValid = isValidPassword("dddd");
  expect(isValid).toBe(false);
});

test("Should reject passwords with the string 'password'", () => {
  const isValid = isValidPassword("PassWorDtu80");
  expect(isValid).toBe(false);
});

test("Should correctly validate a password the meets requirements", () => {
  const isValid = isValidPassword("jdi4dneoi4ieendndiei");
  expect(isValid).toBe(true);
});
