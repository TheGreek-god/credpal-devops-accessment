const request = require("supertest");
const express = require("express");

const app = express();
app.get("/health", (_, res) => res.status(200).send());

describe("Health endpoint", () => {
  it("should return 200", async () => {
    await request(app).get("/health").expect(200);
  });
});
