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

  it("should have the correct result data on card", () => {
    cy.get("#mov")
      .should("include.text", "Bad Boys for Life")
      .should(
        "include.text",
        "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel."
      )
      .should("include.text", "Duration")
      .should("include.text", "Release date")
      .should("include.text", "Scores")
      .should("include.text", "2h 4m")
      .should("include.text", "01/15/2020")
      .should("include.text", "7.2")
      .should("include.text", "Thriller")
      .should("include.text", "Action");
  });

  it("should have the correct data on modal", () => {
    cy.get("#mov").click();
    cy.get("div").contains("Bad Boys for Life");
    cy.get("div").contains("(Ride together. Die together.)");
    cy.get("#actors").should("include.text", "Will Smith");
    cy.get("#actors").should("include.text", "Martin Lawrence");
    cy.get("#actors")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://image.tmdb.org/t/p/w185//6a6cl4ZNufJzrx5HZKWPU1BjjRF.jpg"
      );
    cy.get("#wiki")
      .contains("WIKIPEDIA")
      .should(
        "have.attr",
        "href",
        "https://en.wikipedia.org/wiki/Bad Boys for Life"
      );
    cy.get("#imdb")
      .contains("IMDB")
      .should("have.attr", "href", "https://www.imdb.com/title/tt1502397");
  });
});
