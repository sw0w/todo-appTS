describe("profile", () => {
  const user = {
    id: "1",
    username: "test",
    email: "test@test.com",
    image: "no",
  };

  beforeEach(() => {
    cy.intercept("GET", `https://dummyjson.com/users/${user.id}`, user).as(
      "fetch"
    );
    localStorage.setItem("Token", "aaa");
    localStorage.setItem("id", user.id);
  });

  it("redirects to login if no token is found", () => {
    localStorage.clear();
    cy.visit("/users/1");
    cy.url().should("include", "/login");
  });

  it("displays user profile correctly", () => {
    cy.visit(`/users/${user.id}`);
    cy.wait("@fetch");

    cy.get("h6").contains(user.username);
    cy.get("h6").contains(user.email);
    cy.get("img").should("have.attr", "src", user.image);
  });

  it("logout button is visible", () => {
    cy.visit(`/users/${user.id}`);
    cy.wait("@fetch");
    cy.get('[data-testid="logout"]').should("be.visible");
  });

  it("no access with wrong uid", () => {
    cy.visit("/users/2");
    cy.contains("Permission denied");
  });

  it("logs out the user and redirects to login", () => {
    cy.visit(`/users/${user.id}`);
    cy.get('[data-testid="logout"]').click();
    cy.should(() => {
      expect(localStorage.getItem("Token")).to.be.null;
    });
  });
});
