require("./setup"); // ← yeh line add karo sabse upar
const request = require("supertest");
const app = require("../app");

describe("Auth Routes", () => {
  // ── Register Tests ──
  describe("POST /api/auth/register", () => {
    it("naya user register hona chahiye", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("same email se dobara register nahi hona chahiye", async () => {
      // Pehle register karo
      await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });

      // Same email se phir karo
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User 2",
        email: "test@example.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Email already registered!");
    });

    it("bina email ke register nahi hona chahiye", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ── Login Tests ──
  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Har login test se pehle ek user banao
      await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });
    });

    it("sahi credentials se login hona chahiye", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("galat password se login nahi hona chahiye", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid email or password!");
    });

    it("galat email se login nahi hona chahiye", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
    });
  });
});
