const bcrypt = require("bcryptjs");

async function hashAndPrintPassword() {
  const password = "test123"; // Your current plain text password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);
}

hashAndPrintPassword();
