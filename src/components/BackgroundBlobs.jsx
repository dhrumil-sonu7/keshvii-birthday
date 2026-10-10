/**
 * BackgroundBlobs.jsx
 * Soft blurred neon blobs that slowly morph behind everything.
 */
import React from 'react';

function BackgroundBlobs() {
  return (
    <div className="bg-blobs" aria-hidden="true">
      <div className="blob blob--rose" />
      <div className="blob blob--violet" />
      <div className="blob blob--teal" />
      <div className="blob blob--peach" />
    </div>
  );
}

export default React.memo(BackgroundBlobs);
