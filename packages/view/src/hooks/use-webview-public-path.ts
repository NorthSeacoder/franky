import { useState } from 'react';
import { join } from 'path-browserify';

declare global {
  interface Window {
    __webview_public_path__?: string;
  }
}

const webviewPublicPath = window.__webview_public_path__ ?? '';

export function useWebviewPublicPath(relativePath: string) {
  const path = join(webviewPublicPath, relativePath);
  return useState(path);
}
