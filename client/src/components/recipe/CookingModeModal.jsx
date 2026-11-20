import React, { useState, useEffect } from 'react';

export default function CookingModeModal({ recipe, onClose }) {
  const steps = recipe.steps || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = steps[currentIndex];
  const initialSeconds = (currentStep?.timerMinutes || 0) * 60;

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft((steps[currentIndex]?.timerMinutes || 0) * 60);
    setIsRunning(false);
  }, [currentIndex, steps]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          alert(`⏰ Hết giờ cho Bước ${currentIndex + 1}!`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, currentIndex]);

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!currentStep) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div>
            <span style={styles.subTitle}>Chế độ nấu từng bước</span>
            <h2 style={styles.title}>{recipe.title}</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Đóng">
            ✕
          </button>
        </div>

        <div style={styles.progressText}>
          Bước {currentIndex + 1} / {steps.length}
        </div>

        <div style={styles.body}>
          <p style={styles.instruction}>{currentStep.instruction}</p>

          {currentStep.imageUrl && (
            <img
              src={currentStep.imageUrl}
              alt={`Bước ${currentIndex + 1}`}
              style={styles.stepImg}
            />
          )}

          {currentStep.timerMinutes > 0 && (
            <div style={styles.timerBox}>
              <div style={styles.timerDisplay}>⏱ {formatTime(secondsLeft)}</div>
              <div style={styles.timerControls}>
                <button
                  type="button"
                  onClick={() => setIsRunning((prev) => !prev)}
                  disabled={secondsLeft === 0}
                  style={styles.startBtn}
                >
                  {isRunning ? '⏸ Tạm dừng' : '▶ Bắt đầu hẹn giờ'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRunning(false);
                    setSecondsLeft(initialSeconds);
                  }}
                  style={styles.resetBtn}
                >
                  ↺ Đặt lại
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            style={{ ...styles.navBtn, opacity: currentIndex === 0 ? 0.45 : 1 }}
          >
            ← Bước trước
          </button>

          {currentIndex < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              style={styles.nextBtn}
            >
              Bước tiếp theo →
            </button>
          ) : (
            <button type="button" onClick={onClose} style={styles.doneBtn}>
              🎉 Hoàn thành món ăn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px'
  },
  modal: {
    width: '100%',
    maxWidth: '680px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' },
  subTitle: { fontSize: '12px', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' },
  title: { margin: '4px 0 0 0', fontSize: '20px', color: '#111827' },
  closeBtn: { border: 'none', background: '#f3f4f6', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
  progressText: { margin: '14px 0', fontSize: '14px', fontWeight: 700, color: '#ea580c', background: '#fff7ed', display: 'inline-block', padding: '5px 12px', borderRadius: '20px' },
  body: { minHeight: '180px' },
  instruction: { fontSize: '18px', lineHeight: '1.6', color: '#1f2937', margin: '0 0 16px 0' },
  stepImg: { width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' },
  timerBox: { padding: '18px', backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' },
  timerDisplay: { fontSize: '36px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px', fontFamily: 'monospace' },
  timerControls: { display: 'flex', justifyContent: 'center', gap: '10px' },
  startBtn: { padding: '9px 18px', backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  resetBtn: { padding: '9px 14px', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #e5e7eb' },
  navBtn: { padding: '10px 16px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 600 },
  nextBtn: { padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#ea580c', color: '#fff', cursor: 'pointer', fontWeight: 600 },
  doneBtn: { padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#16a34a', color: '#fff', cursor: 'pointer', fontWeight: 600 }
};