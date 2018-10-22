import getApp from "../../server/app";
import request from "supertest";

describe("Main server application tests", () => {
	it("should export app function", () => {
		expect(getApp).toBeDefined();
	});
	it("should respond for users get route", async () => {
		expect.assertions(1);
		const app = await getApp();
		const response = await request(app).get("/users");
		expect(response.statusCode).toBe(200);
	});
});
