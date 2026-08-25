import React from 'react';

export function Toast({ message, isVisible, icon = '✨' }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '100px'})`,
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '9999px',
        border: '1px solid #818cf8',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
        fontSize: '0.92rem',
        fontWeight: 600,
        zIndex: 999,
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
