import React from 'react';
import './DisconnectModal.css';

interface DisconnectModalType {
  isOpen: boolean;
  onReconnect: () => void;
}

const DisconnectModal: React.FC<DisconnectModalType> = ({
  isOpen,
  onReconnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Connection Lost</h2>
        <p>Your connection to the server has been lost.</p>
        <button className="reconnect-button" onClick={onReconnect}>
          Reconnect
        </button>
      </div>
    </div>
  );
};

export default DisconnectModal;
