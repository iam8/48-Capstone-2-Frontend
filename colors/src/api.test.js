import axios from "axios";
import ColorsApi from "./api";

jest.mock("axios");

console.log("API TESTS -------------------------------------------------------------------------");


test("This is a TEST test", () => {
    expect(1).toBeTruthy();
})


describe("request()", () => {
    ColorsApi.token = "testtoken";

    test("Should return data fetched by axios", async () => {
        const resp = {data: "test data"};
        axios.mockImplementation(() => Promise.resolve(resp));

        const result1 = await ColorsApi.request("testendpoint");
        expect(result1).toBe("test data");

        const result2 = await ColorsApi.request("testendpoint", {field1: "value1"}, "post");
        expect(result2).toBe("test data");
    })

    test("Throws exception with array of error messages on request failure", async () => {
        expect.assertions(2);

        const msg1 = "Msg 1";
        const msg2 = ["Msg 1", "Msg 2"];

        const resp1 = {response: {data: {error: {message: msg1}}}};
        const resp2 = {response: {data: {error: {message: msg2}}}};

        axios.mockImplementationOnce(() => Promise.reject(resp1));
        axios.mockImplementationOnce(() => Promise.reject(resp2));

        const expected = [[msg1], msg2];

        for (let i = 0; i < 2; i++) {
            try {
                await ColorsApi.request("testendpoint");
            } catch(err) {
                expect(err).toEqual(expected[i]);
            }
        }
    })

})