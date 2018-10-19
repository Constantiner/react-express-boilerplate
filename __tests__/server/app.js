import getApp from "../../server/app";

describe("Main server application tests", () => {
	it("should export app function", () => {
		expect(getApp).toBeDefined();
	});
});
