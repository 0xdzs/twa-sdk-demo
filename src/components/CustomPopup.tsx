import React from 'react';

interface CustomPopupProps {
  title: string;
  message: string;
  onOk: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ title, message, onOk, onCancel, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onOk}>OK</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
