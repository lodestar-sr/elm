import React, {FC, useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import {IClientState, IScreen, IServerSettings} from "../../../core/interfaces";
import {CHANNEL, MODE} from "../../../core/enums";
import {SocketService} from "../../../core/services";
import SelectScreenModal from "../SelectScreenModal";
import "./style.scss";

export interface IClientProps {
  serverSettings: IServerSettings;
}

const Presenter: FC<IClientProps> = ({
  serverSettings,
}) => {
  const [states, setStates] = useState<IClientState>({
    role: serverSettings.role,
    channel: serverSettings.channels[0],
    isMobile: serverSettings.isMobile,
  });
  const [availableModes, setAvailableModes] = useState<MODE[]>([]);
  const [availableScreens, setAvailableScreens] = useState<IScreen[]>([]);
  const [availableWindows, setAvailableWindows] = useState<IScreen[]>([]);
  const [selectingMode, setSelectingMode] = useState<MODE>();
  const [screenshot, setScreenshot] = useState(0);

  useEffect(() => {
    if (serverSettings) {
      setStates({
        role: serverSettings.role,
        channel: serverSettings.channels[0],
        isMobile: serverSettings.isMobile,
      });
    }
  }, [serverSettings]);
  
  const onFieldChange = (field: keyof IClientState, value: any) => {
    setStates((states) => ({
      ...(states as IClientState),
      [field]: value,
    }));
  };

  const onStart = async () => {
    await SocketService.startConference();

    const availableModes: MODE[] = [];
    if (states.channel !== CHANNEL.VNC || !states.isMobile) {
      availableModes.push(MODE.SCREEN);
    }
    if (states.channel === CHANNEL.VNC && !states.isMobile) {
      availableModes.push(MODE.WINDOW);
    }
    setAvailableModes(availableModes);

    if (availableModes.includes(MODE.SCREEN)) {
      setAvailableScreens(await SocketService.getAvailableScreens());
    }
    if (availableModes.includes(MODE.WINDOW)) {
      setAvailableWindows(await SocketService.getAvailableWindows());
    }

    onFieldChange('started', true);
    onFieldChange('mode', undefined);

    if (availableModes.length) {
      onFieldChange('screen', undefined);
      onFieldChange('playing', false);
    } else {
      onFieldChange('screen', null);
      onFieldChange('playing', true);
    }

    setScreenshot(0);
  };

  const onStop = async () => {
    await SocketService.stopConference();
    onFieldChange('started', false);
    onFieldChange('mode', undefined);
    onFieldChange('screen', undefined);
    onFieldChange('playing', false);
  };

  const onSelectScreen = async (mode: MODE, screen: IScreen) => {
    await SocketService.selectScreen(mode, screen);
    onFieldChange('mode', mode);
    onFieldChange('screen', screen);
    onFieldChange('playing', true);
  };

  const onTogglePlay = () => {
    onFieldChange('playing', !states.playing);
  };

  const onSendScreen = useCallback(() => {
    return SocketService.sendScreen();
  }, []);

  useEffect(() => {
    if (states.playing) {
      const timer = setInterval(() => {
        setScreenshot((screenshot) => screenshot + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [states.playing, onSendScreen])

  return (
    <div className="present-section">
      {!states.started ? (
        <div className="text-center pt-6 mt-6">
          <button className="btn btn-primary text-xl font-bold px-6" onClick={onStart}>Start</button>
        </div>
      ): (
        <div>
          <div className="d-flex justify-content-center">
            {availableModes.map((mode) => (
              <button
                key={mode}
                className={classNames(
                  'btn capitalize font-bold mx-3',
                  states.mode === mode ? 'btn-primary' : 'btn-primary-outline',
                )}
                onClick={() => setSelectingMode(mode)}
              >
                Select {mode}
              </button>
            ))}
          </div>

          {states.screen !== undefined && (
            <div className="d-flex mt-4 px-4">
              {states.screen ? (
                <div>{states.screen.title} (ID: {states.screen.id})</div>
              ) : (
                <div>Mobile Display</div>
              )}
              <div className="text-primary ml-auto" onClick={onTogglePlay}>
                <i className={classNames('fa cursor-pointer', states.playing ? 'fa-pause-circle' : 'fa-play-circle')} />
              </div>
            </div>
          )}

          <div className="conference-canvas mt-2">
            <canvas />
            {!!screenshot && (
              <div className="info">Screenshot #{screenshot}</div>
            )}
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-danger font-bold px-6" onClick={onStop}>Stop</button>
          </div>
        </div>
      )}

      {selectingMode && (
        <SelectScreenModal
          mode={selectingMode}
          availableModes={availableModes}
          availableScreens={availableScreens}
          availableWindows={availableWindows}
          onSelect={onSelectScreen}
          onClose={() => setSelectingMode(undefined)}
        />
      )}
    </div>
  );
};

export default Presenter;
