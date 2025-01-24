import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  type: 'warning' | 'expired' | 'delete';
  timeRemaining?: number;
  onConfirm?: () => void;
  itemName?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  timeRemaining,
  onConfirm,
  itemName 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
  };

  const renderModalContent = () => {
    switch (type) {
      case 'warning':
        return (
          <>
            <div className="modal-header">
              <h2>Session Expiring Soon</h2>
              <span className="warning-icon">⚠️</span>
            </div>
            <div className="modal-content">
              <p>Your session will expire in {timeRemaining} minutes due to inactivity.</p>
              <p>Please continue working to maintain your session.</p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={onClose} 
                className="animate-button primary"
              >
                <span className="button-content">
                  Continue Session
                </span>
              </button>
            </div>
          </>
        );

      case 'expired':
        return (
          <>
            <div className="modal-header">
              <h2>Session Expired</h2>
              <span className="error-icon">🔒</span>
            </div>
            <div className="modal-content">
              <p>Your session has expired due to inactivity.</p>
              <p>Please log in again to continue.</p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={handleLogin}
                className="animate-button primary"
              >
                <span className="button-content">
                  Log In Again
                </span>
              </button>
            </div>
          </>
        );

      case 'delete':
        return (
          <>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <span className="warning-icon">🗑️</span>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete this ticket?</p>
              {itemName && <p className="item-name">"{itemName}"</p>}
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={onClose} 
                className="animate-button secondary"
              >
                <span className="button-content">
                  Cancel
                </span>
              </button>
              <button 
                onClick={onConfirm}
                className="animate-button danger"
              >
                <span className="button-content">
                  Delete
                </span>
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container fade-in">
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;