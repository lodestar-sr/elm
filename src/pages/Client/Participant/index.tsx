import React, {FC} from "react";
import {IServerSettings} from "../../../core/interfaces";
import "./style.scss";

export interface IClientProps {
  serverSettings: IServerSettings;
}

const Participant: FC<IClientProps> = ({
  serverSettings,
}) => {
  return (
    <div className="participant-section">
      <canvas className="conference-canvas" />
    </div>
  );
};

export default Participant;
