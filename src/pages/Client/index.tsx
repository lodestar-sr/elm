import React, {FC} from "react";
import {IServerSettings} from "../../core/interfaces";
import {ROLE} from "../../core/enums";
import Participant from "./Participant";
import Presenter from "./Presenter";
import "./style.scss";

export interface IClientProps {
  serverSettings: IServerSettings;
}

const Client: FC<IClientProps> = ({
  serverSettings,
}) => {
  return (
    <div className="client-section white-card p-5">
      <h1 className="text-primary text-center mb-4">Client</h1>

      <div className="mb-4">
        <span className="mr-5">Role: <b className="capitalize">{serverSettings.role}</b></span>
        {serverSettings.role === ROLE.PRESENTER && (
          <span>Technology: <b>{serverSettings.channels[0]}</b></span>
        )}
      </div>

      {serverSettings.role === ROLE.PARTICIPANT ? (
        <Participant serverSettings={serverSettings} />
      ): (
        <Presenter serverSettings={serverSettings} />
      )}
    </div>
  );
};

export default Client;
