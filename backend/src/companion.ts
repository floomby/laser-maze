import env from "./env.js";

export const pressCompanionButton = (page: number, button: number) => {
  fetch(`http://${env.COMPANION_AUTHORITY}/press/bank/${page}/${button}`, {
    method: "GET",
  })
    .then((response) =>
      console.log("got companion response", response.status, response.url)
    )
    .catch(console.error);
};
