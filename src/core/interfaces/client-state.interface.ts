import {ROLE, CHANNEL, MODE} from "../enums";
import {IScreen} from "./screen.interface";

export interface IClientState {
  role: ROLE;
  channel: CHANNEL;
  isMobile: boolean;
  started?: boolean;
  playing?: boolean;
  mode?: MODE;
  screen?: IScreen;
}
