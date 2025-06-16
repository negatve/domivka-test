import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const contentStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 32,
  minWidth: 540,
  maxWidth: 900,
  width: "100%",
  boxShadow: "0 8px 32px #0002",
  position: "relative",
  maxHeight: "90vh",         // Додаємо максимальну висоту
  overflowY: "auto",         // Додаємо прокрутку по вертикалі
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#888",
            cursor: "pointer"
          }}
          aria-label="Закрити"
        >×</button>
        {children}
      </div>
    </div>
  );
}