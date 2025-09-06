import React from 'react';
import { APP_CONFIG } from '../config/app.config.js';

/**
 * DeploymentInfo Component
 * 
 * Displays deployment and build information for CI/CD testing.
 * Only shows in development mode or when explicitly enabled.
 * 
 * @component
 */
const DeploymentInfo = () => {
  // Only show in development or if explicitly enabled
  const isDev = import.meta.env.MODE === 'development';
  const showInfo = isDev || import.meta.env.VITE_SHOW_BUILD_INFO === 'true';

  if (!showInfo) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white text-xs p-3 rounded-lg border border-gray-700 shadow-lg z-50">
      <div className="space-y-1">
        <div className="font-semibold text-green-400">🚀 Deployment Info</div>
        <div>Environment: <span className="text-blue-300">{APP_CONFIG.buildInfo.environment}</span></div>
        <div>Build: <span className="text-purple-300">{APP_CONFIG.buildInfo.timestamp.slice(0, 19).replace('T', ' ')}</span></div>
        <div>Commit: <span className="text-yellow-300">{APP_CONFIG.buildInfo.commit}</span></div>
        <div>Version: <span className="text-cyan-300">{APP_CONFIG.version}</span></div>
      </div>
    </div>
  );
};

export default DeploymentInfo;
