import {ROLE, CHANNEL} from "../enums";

export interface IServerSettings {
  role: ROLE;
  channels: CHANNEL[];
  isMobile: boolean;
}