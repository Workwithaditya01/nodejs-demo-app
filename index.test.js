
const request = require("supertest");

const app = require("./index");

describe("nodejs-demo-app", () => {
  test("GET / returns the web application", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });

  test("GET /api returns welcome message", async () => {
    const res = await request(app).get("/api");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello from nodejs-demo-app!");
  });

  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("nodejs-demo-app");
  });

  test("GET /add/2/3 returns 5", async () => {
    const res = await request(app).get("/add/2/3");

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test("GET /add/x/3 returns 400", async () => {
    const res = await request(app).get("/add/x/3");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

