import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";

const initialNodes = [
  {
    id: "p1",
    data: {
      label: (
        <div>
          <h1>p1</h1>
          <p>w1 → p1</p>
          <p>w2 → p3</p>
        </div>
      ),
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "p2",
    data: {
      label: (
        <div>
          <h1>p2</h1>
          <p>w1 → p4</p>
          <p>w2 → [pending]</p>
        </div>
      ),
    },
    position: { x: 300, y: 0 },
  },
  {
    id: "p3",
    data: { label: <h1>p3</h1> },
    position: { x: 150, y: 200 },
  },
];

const initialEdges = [
  { id: "e1", source: "p1", target: "p3", label: "p1w2" },
  { id: "e2", source: "p1", target: "p1", label: "p1w1" },
];

export default function PageGraph() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);


  const { nodes, edges } = generateGraphData(pages);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, label: "new link" }, eds)),
    []
  );

  return (
    <div style={{ height: 600 }}>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

function generateGraphData(pages) {
  const nodes = [];
  const edges = [];

  pages.forEach((page, index) => {
    // Create a node for each page
    nodes.push({
      id: page.name,
      position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
      data: {
        label: (
          <div>
            <h1>{page.name}</h1>
            {page.widgets?.map((w, i) => (
              <p key={i}>
                {w.widgetName} → {w.toPage || "[not set]"}
              </p>
            ))}
          </div>
        ),
      },
    });

    // Create edges for each widget with a valid toPage
    page.widgets?.forEach((widget, i) => {
      if (widget.toPage) {
        edges.push({
          id: `${page.name}-${widget.widgetName}-to-${widget.toPage}`,
          source: page.name,
          target: widget.toPage,
          label: widget.widgetName,
        });
      }
    });
  });

  return { nodes, edges };
}
