import React from 'react';

interface LoadingProps {
  size?: number; // kích thước spinner (px)
  color?: string; // màu spinner
  message?: string; // thông báo dưới spinner
}

const LoadingTest: React.FC<LoadingProps> = ({
  size = 40,
  color = '#3498db',
  message = 'Đang tải...',
}) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.spinner,
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}
      />
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  spinner: {
    border: '4px solid',
    borderRadius: '50%',
    animation: 'spin 1.2s linear infinite',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
};

// CSS animation keyframes (bạn nhớ add vào global CSS hoặc style tag)
const styleSheet = document.styleSheets[0];
const keyframes = `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default LoadingTest;
