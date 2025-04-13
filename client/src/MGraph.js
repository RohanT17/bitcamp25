// MGraph.js
import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function MGraph() {
  const [data, setData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fetch("/birds.json")
      .then((res) => res.json())
      .then((raw) => {
        const cleaned = {
          nodes: raw.nodes.map(({ id, group, summary }) => ({
            id,
            group,
            summary,
          })),
          links: raw.links,
        };
        setData(cleaned);
      });
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {data && (
        <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="group"
          onNodeClick={handleNodeClick}
          nodeRelSize={6} // Increase the default node size for better clickability
          nodeCanvasObject={(node, ctx, globalScale) => {
            // First draw a circle for better click detection
            const size = 4;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
            ctx.fillStyle = node.color || "rgba(31, 120, 180, 0.8)";
            ctx.fill();

            // Then draw the label
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(
              (n) => n + fontSize * 0.2
            );

            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.color || "rgba(31, 120, 180, 0.8)";
            ctx.fillText(label, node.x, node.y);

            // Store dimensions for pointer area
            node.__bckgDimensions = bckgDimensions;
            node.__size = size * 2; // Store size for pointer detection
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            // Draw a larger invisible circle for better click detection
            const pointerRadius =
              Math.max(
                (node.__bckgDimensions?.[0] || 20) / 2, // fallback width
                (node.__bckgDimensions?.[1] || 12) / 2, // fallback height
                node.__size || 10
              ) + 4; // Add padding for easier clicking

            ctx.beginPath();
            ctx.arc(node.x, node.y, pointerRadius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }}
        />
      )}

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "200px",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            maxWidth: "300px",
            zIndex: 100,
            border: `2px solid ${selectedNode.color}`,
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: selectedNode.color }}>
            {selectedNode.id}
          </h3>
          <p style={{ margin: 0 }}>{selectedNode.summary}</p>
        </div>
      )}
    </div>
  );
}
