describe("list page", () => {
  beforeEach(() => {
    localStorage.setItem(
      "Token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3Mzg5MDk3ODYsImV4cCI6MTczODkxMTU4Nn0.yF8hPg0gqid9JGciAF7afRXw_qZhiaWMu5ubTn7ZKTY"
    );
    localStorage.setItem("id", "1");
  });

  it("renders without crashing", () => {
    cy.visit("http://localhost:5173/list");
    cy.contains("Memorize a poem").should("exist");
  });

  it("loads all todos correctly", () => {
    cy.visit("http://localhost:5173/list");
    cy.contains("Memorize a poem").should("exist");
    cy.contains("Invest in cryptocurrency").should("exist");
  });
});
