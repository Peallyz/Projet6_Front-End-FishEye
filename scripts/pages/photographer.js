import { photographerFactory } from "../factories/photographer.js";

//Retrieve current URL id

const url = new URL(window.location);
const id = parseInt(url.searchParams.get("id"));
