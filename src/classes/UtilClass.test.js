import UtilClass from "./UtilClass";

describe('parseJwt', () => {
    test('works', () => {
        const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RfVXNlciIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA3OTY3OTB9.JXpiqpaF2SkAA6rN4Kiea3w8D2xIA4pmaaUH08lDrWI';
        const jsonPayload = UtilClass.parseJwt(testToken);
        expect(jsonPayload.username).toEqual('Test_User');
        expect(jsonPayload.isAdmin).toEqual(false);
    });
});

describe('objKeysValsToString', () => {
    test('works', () => {
        const testObj = {title: 'test title', body: 'test body'};
        const outputString = UtilClass.objKeysValsToString(testObj);
        expect(outputString).toEqual("title - 'test title' | body - 'test body'");
    });
});