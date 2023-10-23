import "./popup.scss";

export default function Popup({ isOpen, header, onClose, children }) {
  return (
    <>
      {isOpen ? (
        <div className="popup__overlay" onClick={onClose}>
          <div className="popup__holder">
            <div className="popup__header">
              <div className="popup__header-title">{header}</div>{" "}
              <button
                className="btn btn-light btn-watch-later"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="popup__content">
              {children}
            </div>

          </div>
        </div>
      ) : null}
    </>
  );
}
