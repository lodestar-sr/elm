import React, {FC, useEffect, useState} from "react";
import classNames from "classnames";
import "./style.scss";

export interface IButton {
  label: string;
  value: any;
}

export interface IButtonGroupProps {
  className?: string;
  label?: string;
  buttons: IButton[];
  value?: any;
  multiple?: boolean;
  onChange?: (value: any) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({
  className,
  label,
  buttons,
  value,
  multiple,
  onChange,
}) => {
  const [selectedButtons, setSelectedButtons] = useState<any[]>([]);

  useEffect(() => {
    if (multiple) {
      setSelectedButtons(value || []);
    } else {
      setSelectedButtons(value !== undefined ? [value] : []);
    }
  }, [value, multiple]);

  const onToggleButton = (button: IButton) => {
    if (multiple) {
      const isSelected = selectedButtons.includes(button.value);
      let newValue;
      if (isSelected) {
        newValue = selectedButtons.filter((item) => item !== button.value);
      } else {
        newValue = [...selectedButtons, button.value];
      }
      setSelectedButtons(newValue);

      if (onChange) {
        onChange(newValue);
      }
    } else {
      setSelectedButtons([button.value]);
      if (onChange) {
        onChange(button.value);
      }
    }
  };

  return (
    <div className={classNames('button-group', className)}>
      {label && (
        <div className="label">{label}</div>
      )}
      <div className="buttons">
        {buttons.map((button, i) => (
          <button
            key={i}
            type="button"
            className={classNames(selectedButtons.includes(button.value) && 'active')}
            onClick={() => onToggleButton(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};
