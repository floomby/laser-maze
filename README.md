## Laser Maze App

### Setup

Install node + npm (I am using node20 so probably just grab this version)

```bash
# install yarn
npm install -g yarn

# clone repo
git clone https://github.com/floomby/laser-maze.git

cd laser-maze
yarn
```

The edit the `.env` file to fill out the configuration details

### Running

Right now just run the dev build without mocking

```bash
yarn dev-no-mock
```

It should be accessible on port 5173 on all interfaces over http.

### Fog

Turning on and off the fog from companion can be done by sending get requests to `/fog/on` and `/fog/off`

This will send the bytes `0x06` and `0x07` (respectively) to the device.
