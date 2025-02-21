import "cypress";

describe("Todo unittesting", () => {
  it("Adds todo", () => {
    cy.window().then((window) => {
      window.localStorage.setItem("id", "1");
      window.localStorage.setItem(
        "Token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3Mzg5MDk3ODYsImV4cCI6MTczODkxMTU4Nn0.yF8hPg0gqid9JGciAF7afRXw_qZhiaWMu5ubTn7ZKTY"
      );
    });

    cy.visit("http://localhost:5173/list");

    cy.intercept("POST", "https://dummyjson.com/todos/add", (req) => {
      if (
        req.body.todo === "Fly a plane" &&
        req.body.userId === 5 &&
        req.body.completed === false
      ) {
        console.log("Right info", req.body);
      } else {
        console.log("False info.", req.body);
      }
    }).as("submitRequest");

    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="textbox"]').type("Fly a plane");
    cy.get('[data-testid="submit"]').click();

    cy.get('[data-testid="submit"]')
      .should("exist")
      .and("be.visible")
      .then(() => {
        cy.wait("@submitRequest");
      });

    cy.contains("Fly a plane").should("be.visible");
  });
  it("Deletes a todo", () => {
    cy.window().then((window) => {
      window.localStorage.setItem("id", "1");
      window.localStorage.setItem(
        "Token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3Mzg5MDk3ODYsImV4cCI6MTczODkxMTU4Nn0.yF8hPg0gqid9JGciAF7afRXw_qZhiaWMu5ubTn7ZKTY"
      );
    });

    cy.intercept("DELETE", "https://dummyjson.com/todos/1").as("submitRequest");

    cy.visit("http://localhost:5173/list");

    cy.get('[data-testid="delete"]').first().click();

    cy.get('[data-testid="delete"]')
      .first()
      .should("exist")
      .and("be.visible")
      .then(() => {
        cy.wait("@submitRequest");
      });
  });
});
