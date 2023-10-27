/* Protocol for the laser -> backend software
  0x01 - player started
  0x02 - laser tripped
  0x03 - halfway point
  0x04 - player finished
    0xXXXXXXXX - big endian time of run in milliseconds (laser penalty added here)
  0x05 - time expired
*/

import { Writable } from "stream";

enum ParserState {
  IDLE,
  PLAYER_FINISHED,
}

export type ProtocolHandler = {
  onPlayerStarted?: () => void;
  onLaserTripped?: () => void;
  onHalfwayPoint?: () => void;
  onPlayerFinished?: (timeOfRun: number) => void;
  onTimeExpired?: () => void;
};

export class ProtocolParser extends Writable {
  private state: ParserState = ParserState.IDLE;
  private buffer: Buffer = Buffer.alloc(0);
  private handlers: ProtocolHandler;

  constructor(handlers: ProtocolHandler) {
    super({ objectMode: true });
    this.handlers = handlers;
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    this.buffer = Buffer.concat([this.buffer, chunk]);

    while (this.buffer.length > 0) {
      switch (this.state) {
        case ParserState.IDLE:
          this.processIdleState();
          break;
        case ParserState.PLAYER_FINISHED:
          if (this.buffer.length >= 4) {
            const timeOfRun = this.buffer.readUInt32BE(0);
            this.buffer = this.buffer.slice(4);
            this.handlers.onPlayerFinished?.(timeOfRun);
            this.state = ParserState.IDLE;
          } else {
            return callback();
          }
          break;
      }
    }
    callback();
  }

  private processIdleState() {
    const eventByte = this.buffer.readUInt8(0);
    this.buffer = this.buffer.slice(1);

    switch (eventByte) {
      case 0x01:
        this.handlers.onPlayerStarted?.();
        break;
      case 0x02:
        this.handlers.onLaserTripped?.();
        break;
      case 0x03:
        this.handlers.onHalfwayPoint?.();
        break;
      case 0x04:
        this.state = ParserState.PLAYER_FINISHED;
        break;
      case 0x05:
        this.handlers.onTimeExpired?.();
        break;
    }
  }
}
