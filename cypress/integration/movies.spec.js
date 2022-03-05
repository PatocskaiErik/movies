import { wait } from "@testing-library/user-event/dist/utils";

describe("Movies", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should open the home page", () => {
    cy.get("div").contains("MOVIE DATABASE");
  });

  it("should have a searchbar with a label", () => {
    cy.get("input").should("have.attr", "type", "text");
    cy.contains("label", "Search a movie");
  });

  it("should have a button", () => {
    cy.get("button").contains("Search");
  });

  it("should type a movie name", () => {
    cy.get("input").type("Bad Boys");
    cy.get("form").submit();
    cy.wait(5000);
  });
});

describe("Results", () => {
  it("should have a Home button", () => {
    cy.get("div").contains("Home");
  });

  it("should click onto the button and renavigate to the Home", () => {
    cy.get("div").contains("Home").click();
  });

  it("should type a movie name", () => {
    cy.get("form").submit();
    cy.wait(5000);
  });
});
