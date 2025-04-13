import React from "react";
import "./MindMap.css";

function MindMap() {
  const handleGenerateMindMap = () => {
    // Open the mgraph.html page in a new tab
    window.open("/mgraph.html", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mindmap-page">
      <h2>Mind Map</h2>
      <button onClick={handleGenerateMindMap}>Generate Mind Map</button>
    </div>
  );
}

export default MindMap;
