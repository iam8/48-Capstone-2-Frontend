import axios from "axios";
import ColorsApi from "./api";

jest.mock("axios");

console.log("API TESTS -------------------------------------------------------------------------");


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


describe("signup()", () => {
    const data = {
        username: "USERNAME",
        password: "PASSWORD",
        firstName: "FIRSTNAME",
        lastName: "LASTNAME"
    };

    const token = "AUTHTOKEN";
    const resp = {data: {token}};

    test("Calls axios with correct arguments and returns token property of result", async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.any(String),
            method: "post",
            data,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.signup(data);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(token);
    })
})


describe("login()", () => {
    const data = {
        username: "USERNAME",
        password: "PASSWORD"
    };

    const token = "AUTHTOKEN";
    const resp = {data: {token}};

    test("Calls axios with correct arguments and returns token property of result", async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.any(String),
            method: "post",
            data,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.login(data);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(token);
    })
})


describe("getUser()", () => {
    const username = "USERNAME";
    const userData = "USERDATA";
    const resp = {data: {user: userData}};

    test("Calls axios with correct arguments and returns user property of result", async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(username),
            method: "get",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.getUser(username);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(userData);
    })
})


describe("saveUserData()", () => {
    const reqData = {
        username: "USERNAME",
        password: "PASSWORD",
        firstName: "FIRSTNAME",
        lastName: "LASTNAME",
        isAdmin: true
    };

    const axiosData = {...reqData};
    delete axiosData.username;

    const userData = "USERDATA";
    const resp = {data: {user: userData}};

    test("Calls axios with correct arguments and returns user property of result", async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(reqData.username),
            method: "patch",
            data: axiosData,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.saveUserData(reqData);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(userData);
    })
})


describe("deleteUser()", () => {
    const username = "USERNAME";
    const deleted = "DELETED";
    const resp = {data: {deleted}};

    test("Calls axios with correct arguments and returns 'deleted' property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(username),
            method: "delete",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.deleteUser(username);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(deleted);
    })
})


describe("createCollection()", () => {
    const data = {
        title: "TITLE"
    };

    const collection = "COLLECTION";
    const resp = {data: {collection}};

    test("Calls axios with correct arguments and returns collection property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.any(String),
            method: "post",
            data,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.createCollection(data);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(collection);
    })
})


describe("addColor()", () => {
    const id = 0;
    const data = {
        colorHex: "COLORHEX"
    };

    const dataRes = "DATARESULT";
    const resp = {data: dataRes};

    test("Calls axios with correct arguments and returns result", async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(`${id}`),
            method: "post",
            data,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.addColor(id, data);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(dataRes);
    })
})


describe("removeColor()", () => {
    const id = 0;
    const hex = "HEX";
    const deleted = "DELETED";
    const resp = {data: {deleted}};

    test("Calls axios with correct arguments and returns 'deleted' property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(`${id}`),
            method: "delete",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.removeColor(id, hex);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(deleted);
    })
})


describe("getCollection()", () => {
    const id = 0;
    const collection = "COLLECTION";
    const resp = {data: {collection}};

    test("Calls axios with correct arguments and returns collection property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(`${id}`),
            method: "get",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.getCollection(id);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(collection);
    })
})


describe("getCollsByUser()", () => {
    const username = "USERNAME";
    const collections = "COLLECTIONS";
    const resp = {data: {collections}};

    test("Calls axios with correct arguments and returns collections property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(username),
            method: "get",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.getCollsByUser(username);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(collections);
    })
})


describe("renameCollection()", () => {
    const id = 0;
    const titleData = {
        newTitle: "NEWTITLE"
    };

    const updated = "UPDATED";
    const resp = {data: {updated}};

    test("Calls axios with correct arguments and returns 'updated' property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(`${id}`),
            method: "patch",
            data: titleData,
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.renameCollection(id, titleData);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(updated);
    })
})


describe("deleteCollection()", () => {
    const id = 0;
    const deleted = "DELETED";
    const resp = {data: {deleted}};

    test("Calls axios with correct arguments and returns 'deleted' property of result",
    async () => {
        axios.mockImplementation(() => Promise.resolve(resp));

        const expArgs = {
            url: expect.stringContaining(`${id}`),
            method: "delete",
            data: {},
            headers: {Authorization: expect.any(String)},
            params: {}
        };

        const result = await ColorsApi.deleteCollection(id);
        expect(axios).toHaveBeenCalledWith(expArgs);
        expect(result).toEqual(deleted);
    })
})

