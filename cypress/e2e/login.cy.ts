describe("login tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.intercept("POST", "https://dummyjson.com/user/login").as(
      "submitRequest"
    );
  });

  it("logs in successfully", () => {
    cy.contains("button", "Login").click();
    cy.get('[data-testid="username-input"]').type("emilys");
    cy.get('[data-testid="password-input"]').type("emilyspass");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@submitRequest").then((req) => {
      expect(req.response.statusCode).to.eq(200);
    });
  });

  it("fails to log in", () => {
    cy.contains("button", "Login").click();
    cy.get('[data-testid="username-input"]').type("wrong");
    cy.get('[data-testid="password-input"]').type("wrongpass");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@submitRequest").then((req) => {
      expect(req.response.statusCode).to.eq(400);
    });
  });
});
