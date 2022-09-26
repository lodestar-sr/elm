import React, {FC} from "react";
import classNames from "classnames";
import "./style.scss";

export interface IModalProps {
  className?: string;
  children: React.ReactNode;
  onClose(): void;
}

export const Modal: FC<IModalProps> = ({
  className,
  children,
  onClose,
}) => (
  <div className={classNames('modal', className)}>
    <div className="backdrop" onClick={onClose} />
    <div className="modal-content">
      <i className="close far fa-times-circle cursor-pointer" onClick={onClose} />
      {children}
    </div>
  </div>
);
