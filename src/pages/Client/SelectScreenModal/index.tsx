import React, {FC, useState} from "react";
import classNames from "classnames";
import {MODE} from "../../../core/enums";
import {IScreen} from "../../../core/interfaces";
import {Modal} from "../../../components";
import "./style.scss";

export interface ISelectScreenModalProps {
  mode: MODE;
  availableModes: MODE[];
  availableScreens: IScreen[];
  availableWindows: IScreen[];
  onSelect(mode: MODE, screen: IScreen): void;
  onClose(): void;
}

const SelectScreenModal: FC<ISelectScreenModalProps> = ({
  mode,
  availableModes,
  availableScreens,
  availableWindows,
  onSelect,
  onClose,
}) => {
  const [tab, setTab] = useState<MODE>(mode);
  const [selectedScreen, setSelectedScreen] = useState<IScreen>();

  const onSubmit = () => {
    onSelect(tab, selectedScreen as IScreen);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="select-screen p-5">
        <div className="tab">
          <div className="tab-header">
            {availableModes.map((mode) => (
              <div
                key={mode}
                className={classNames('header capitalize', mode === tab && 'active')}
                onClick={() => setTab(mode)}
              >
                {mode}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tab === MODE.SCREEN && (
              <div>
                {availableScreens.map((item) => (
                  <div
                    key={item.id}
                    className={classNames('screen-item', item === selectedScreen && 'active')}
                    onClick={() => setSelectedScreen(item)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
            {tab === MODE.WINDOW && (
              <div>
                {availableWindows.map((item) => (
                  <div
                    key={item.id}
                    className={classNames('screen-item', item === selectedScreen && 'active')}
                    onClick={() => setSelectedScreen(item)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-right mt-4">
          <button
            className="btn btn-primary text-md font-bold"
            disabled={!selectedScreen}
            onClick={onSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectScreenModal;
