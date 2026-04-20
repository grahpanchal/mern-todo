require("./setup"); // ← yeh line add karo sabse upar
const request = require("supertest");
const app = require("../app");

describe("Todo Routes", () => {
  let token;

  // Har test se pehle — login karke token lo
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    token = res.body.token;
  });

  // ── GET todos ──
  it("todos fetch hone chahiye", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("bina token ke todos nahi milne chahiye", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toBe(401);
  });

  // ── POST todo ──
  it("naya todo banana chahiye", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Todo" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Todo");
    expect(res.body.completed).toBe(false);
  });

  it("bina title ke todo nahi banana chahiye", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  // ── PUT toggle ──
  it("todo complete toggle hona chahiye", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Toggle Test" });

    const todoId = createRes.body._id;

    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  // ── DELETE todo ──
  it("todo delete hona chahiye", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Delete Test" });

    const todoId = createRes.body._id;

    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Todo deleted!");
  });
});
