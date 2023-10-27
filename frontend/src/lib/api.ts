// adds a player to the queue
export const addPlayer = (name: string) => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/player`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

// removes a player from the queue
export const removePlayer = (id: number) => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/removePlayer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

// sets the current player to this player and and resets the laser maze into an accepting state
export const play = (id: number) => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/play`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

export const reset = () => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/reset`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

export const clearData = () => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/leaderboard`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

export const stopLights = () => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/stopLights`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
}

export const startLights = () => {
  fetch(
    `http://${window.location.hostname}:${
      import.meta.env.VITE_BACKEND_PORT
    }/startLights`,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
}