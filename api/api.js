import { create } from "apisauce";

const genderApi = create({
    baseURL: "https://api.genderize.io",
    headers: { Accept: 'application/json' },
});
const contactsApi = create({
    baseURL: 'http://api.hajjwayfinder.com.ng/',
    headers: { Accept: 'application/json' },
});

// transforms

export {
    genderApi,
    contactsApi
}