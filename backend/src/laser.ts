import { SerialPort } from "serialport";
import EventEmitter from "events";

import { ProtocolHandler, ProtocolParser } from "./protocol.js";

export enum LaserEvent {
  STARTED = "started",
  TRIPPED = "tripped",
  HALFWAY = "halfway",
  FINISHED = "finished",
  EXPIRED = "expired",
}

export default class Laser extends EventEmitter implements ProtocolHandler {
  private port: SerialPort;

  constructor(path: string) {
    super();

    this.port = new SerialPort({
      path,
      baudRate: 9600,
      autoOpen: false,
    });

    this.port.open((err) => {
      if (err) {
        console.error("Failed to open port:", err.message);
        process.exit(1);
      }
      console.log(`Connected to ${path}`);
    });

    this.port.pipe(new ProtocolParser(this));
  }

  onPlayerStarted() {
    console.log("Player started");
    this.emit(LaserEvent.STARTED);
  }

  onLaserTripped() {
    console.log("Laser tripped");
    this.emit(LaserEvent.TRIPPED);
  }

  onHalfwayPoint() {
    console.log("Halfway point");
    this.emit(LaserEvent.HALFWAY);
  }

  onPlayerFinished(timeOfRun: number) {
    console.log("Player finished:", timeOfRun);
    this.emit(LaserEvent.FINISHED, timeOfRun);
  }

  onTimeExpired() {
    console.log("Time expired");
    this.emit(LaserEvent.EXPIRED);
  }

  // reset the laser maze to playable state by sending a 0x00 byte
  reset() {
    console.log("Resetting laser maze");
    this.port.write("00", "hex");
    // drain the port to ensure the write completes
    this.port.drain();
  }

  fogOn() {
    console.log("Fog on");
    this.port.write("06", "hex");
    this.port.drain();
  }

  fogOff() {
    console.log("Fog off");
    this.port.write("07", "hex");
    this.port.drain();
  }
}
