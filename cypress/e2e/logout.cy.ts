describe("template spec", () => {
  it("passes", () => {
    cy.window().then((window) => {
      window.localStorage.setItem("id", "1");
      window.localStorage.setItem(
        "Token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3Mzg5MDk3ODYsImV4cCI6MTczODkxMTU4Nn0.yF8hPg0gqid9JGciAF7afRXw_qZhiaWMu5ubTn7ZKTY"
      );
    });

    cy.visit("http://localhost:5173/users/1");
    cy.get('[data-testid="logout"]').click();
  });
});
