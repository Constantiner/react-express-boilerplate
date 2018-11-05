import getApp from "../../server/app";
import request from "supertest";

describe("Main server application tests", () => {
	it("should respond for users get route", async () => {
		expect.assertions(3);
		const app = await getApp();
		const response = await request(app).get("/users/me");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			homePage: "https://github.com/Constantiner",
			firstName: "Konstantin",
			lastName: "Kovalev"
		});
		expect(response.header["content-type"]).toMatch(/^application\/json;\s+charset=utf-8$/i);
	});
});
