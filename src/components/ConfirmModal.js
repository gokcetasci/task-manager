import React from "react";

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div>
      <div>
        <p>Bu görevi silmek istediğinizden emin misiniz?</p>
        <button onClick={onConfirm}>Evet</button>
        <button onClick={onCancel}>Hayır</button>
      </div>
    </div>
  );
}

export default ConfirmModal;
