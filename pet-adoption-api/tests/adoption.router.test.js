const request = require("supertest");
const { faker } = require("@faker-js/faker");

const app = require("../src/app");
const adoptionService = require("../src/services/adoption.service");
const { resetAdoptions } = require("../src/data/adoption.memory");

const fakeAdoption = () => ({
  petName: faker.animal.dog(),
  petType: faker.helpers.arrayElement(["dog", "cat"]),
  adopterName: faker.person.fullName(),
  adopterEmail: faker.internet.email()
});

describe("Functional tests for adoption.router.js", () => {
  beforeEach(() => {
    resetAdoptions();
    jest.restoreAllMocks();
  });

  describe("GET /api/adoptions", () => {
    test("should return all adoption requests", async () => {
      const response = await request(app).get("/api/adoptions");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.payload)).toBe(true);
      expect(response.body.payload.length).toBeGreaterThan(0);
    });

    test("should return 500 when service fails", async () => {
      jest.spyOn(adoptionService, "getAll").mockImplementation(() => {
        throw new Error("Service error");
      });

      const response = await request(app).get("/api/adoptions");

      expect(response.statusCode).toBe(500);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Internal server error");
    });
  });

  describe("GET /api/adoptions/:id", () => {
    test("should return one adoption by id", async () => {
      const response = await request(app).get("/api/adoptions/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.payload).toHaveProperty("id", 1);
    });

    test("should return 404 when adoption does not exist", async () => {
      const response = await request(app).get("/api/adoptions/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Adoption not found");
    });
  });

  describe("POST /api/adoptions", () => {
    test("should create a new adoption request", async () => {
      const adoption = fakeAdoption();

      const response = await request(app)
        .post("/api/adoptions")
        .send(adoption);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.payload).toHaveProperty("id");
      expect(response.body.payload.petName).toBe(adoption.petName);
      expect(response.body.payload.status).toBe("pending");
    });

    test("should return 400 when required fields are missing", async () => {
      const response = await request(app)
        .post("/api/adoptions")
        .send({
          petName: "Rocky"
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Missing required fields");
    });

    test("should return 500 when create service fails", async () => {
      jest.spyOn(adoptionService, "create").mockImplementation(() => {
        throw new Error("Create error");
      });

      const response = await request(app)
        .post("/api/adoptions")
        .send(fakeAdoption());

      expect(response.statusCode).toBe(500);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Internal server error");
    });
  });

  describe("PUT /api/adoptions/:id/status", () => {
    test("should update adoption status", async () => {
      const response = await request(app)
        .put("/api/adoptions/1/status")
        .send({ status: "approved" });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.payload.status).toBe("approved");
    });

    test("should return 400 when status is invalid", async () => {
      const response = await request(app)
        .put("/api/adoptions/1/status")
        .send({ status: "waiting" });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Invalid status");
    });

    test("should return 404 when adoption does not exist", async () => {
      const response = await request(app)
        .put("/api/adoptions/999/status")
        .send({ status: "approved" });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Adoption not found");
    });
  });

  describe("DELETE /api/adoptions/:id", () => {
    test("should delete an adoption request", async () => {
      const response = await request(app).delete("/api/adoptions/2");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Adoption deleted successfully");
    });

    test("should return 404 when adoption does not exist", async () => {
      const response = await request(app).delete("/api/adoptions/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Adoption not found");
    });
  });
});