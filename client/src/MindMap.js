import { useState } from "react";
import FileUpload from "./FileUpload";
import "./MindMap.css";

function MindMap() {
  const [mindMapData, setMindMapData] = useState(null);

  return (
    <div className="mindmap-page">
      <h2>Mind Map</h2>
      <FileUpload onDataReady={setMindMapData} />
      {mindMapData && (
        <div className="mindmap-result">
          <h3>Extracted Key Concepts</h3>
          <ul>
            {mindMapData.nodes.map((node) => (
              <li key={node.id}>{node.label}</li>
            ))}
          </ul>
          <h3>Transcript Preview</h3>
          <p>{mindMapData.raw_text.slice(0, 500)}...</p>
          {/* Future: Replace with D3/Mermaid rendering */}
        </div>
      )}
    </div>
  );
}

export default MindMap;
