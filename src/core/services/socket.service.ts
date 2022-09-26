import {SCREENS, WINDOWS} from "../constants";
import {MODE} from "../enums";
import {IScreen} from "../interfaces";

export class SocketService {

  static startConference() {
    return Promise.resolve();
  }

  static stopConference() {
    return Promise.resolve();
  }

  static selectScreen(mode: MODE, screen: IScreen) {
    return Promise.resolve();
  }

  static sendScreen() {
    return Promise.resolve();
  }

  static getAvailableScreens() {
    return Promise.resolve(SCREENS);
  }

  static getAvailableWindows() {
    return Promise.resolve(WINDOWS);
  }
}