import React, {FC, useEffect, useState} from "react";
import {ButtonGroup} from "../../components";
import {IServerSettings} from "../../core/interfaces";
import {CHANNEL, ROLE} from "../../core/enums";
import "./style.scss";

export interface IServerProps {
  onChangeSettings(settings: IServerSettings);
}

const roleOptions = [
  { label: 'Presenter', value: ROLE.PRESENTER },
  { label: 'Participant', value: ROLE.PARTICIPANT },
];

const channelOptions = [
  { label: 'VNC', value: CHANNEL.VNC },
  { label: 'WebRTC', value: CHANNEL.WEBRTC },
];

const deviceOptions = [
  { label: 'Mobile', value: true },
  { label: 'Desktop', value: false },
];

const Server: FC<IServerProps> = ({
  onChangeSettings,
}) => {
  const [settings, setSettings] = useState<IServerSettings>({
    role: ROLE.PRESENTER,
    channels: [CHANNEL.VNC, CHANNEL.WEBRTC],
    isMobile: false,
  });

  useEffect(() => {
    onChangeSettings(settings);
  }, []);
  
  const onFieldChange = (field: keyof IServerSettings, value: any) => {
    setSettings((settings) => ({
      ...settings,
      [field]: value,
    }));
  };

  const onSubmit = () => {
    if (settings.role && settings.channels.length) {
      onChangeSettings(settings);
    }
  };

  return (
    <div className="server-section white-card p-5">
      <h1 className="text-primary text-center mb-4">Server</h1>

      <ButtonGroup
        className="mb-5"
        label="Select Role"
        buttons={roleOptions}
        value={settings.role}
        onChange={(value) => onFieldChange('role', value)}
      />

      <ButtonGroup
        className="mb-5"
        label="Select Technologies"
        buttons={channelOptions}
        multiple
        value={settings.channels}
        onChange={(value) => onFieldChange('channels', value)}
      />

      <ButtonGroup
        className="mb-5"
        label="Select Device"
        buttons={deviceOptions}
        value={settings.isMobile}
        onChange={(value) => onFieldChange('isMobile', value)}
      />

      <div className="text-right mt-auto">
        <button
          className="btn btn-primary-outline font-bold"
          onClick={onSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Server;
