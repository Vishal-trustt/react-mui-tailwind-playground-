import React, { useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

/**
 * Complete, single-file React app that renders a node graph like the screenshot.
 * - Custom Stage cards (Login → OTP → Home Page → Intro Screen)
 * - Action pills under a stage (e.g., Personal Loan, MSME Loan, etc.)
 * - Click an action pill to create a new child Stage and a labeled edge
 * - Drag & Drop from the right sidebar to add new Stages
 * - Pan/zoom, edge labels, smooth edges, and a dotted background
 *
 * Drop this file into a Vite/CRA React project and use it as your App.tsx/App.jsx.
 * Install:  npm i reactflow
 */

// ---------- Small utilities ----------
let idSeq = 10;
const genId = () => String(idSeq++);

const edgeDefaults = {
  animated: false,
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
};

// ---------- Custom Nodes ----------
function StageNode({ id, data }) {
  const rf = useReactFlow();

  const createChild = useCallback(
    (label) => {
      const newId = genId();
      const parent = rf.getNode(id);
      const yGap = 150;
      const xOffset = (Math.random() - 0.5) * 80; // slight spread

      rf.addNodes({
        id: newId,
        type: "stage",
        position: { x: parent.position.x + xOffset, y: parent.position.y + yGap },
        data: { title: `${label} Screen`, actions: ["Next"], subtitle: "Stage Name" },
      });

      rf.addEdges({
        id: `e-${id}-${newId}`,
        source: id,
        target: newId,
        label,
        ...edgeDefaults,
      });
    },
    [id, rf]
  );

  return (
    <div className="rounded-2xl shadow-md bg-white border border-neutral-200 min-w-[260px]">
      <div className="bg-blue-500 text-white text-[10px] font-semibold px-3 py-1 rounded-t-2xl w-max translate-y-[-10px] translate-x-3 shadow">
        {data.subtitle || "Stage Name"}
      </div>

      <div className="px-4 pt-1 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">□</div>
          <div className="flex-1">
            <div className="font-semibold">{data.title}</div>
            {data.meta && (
              <div className="text-[11px] text-neutral-500">{data.meta}</div>
            )}
          </div>
          <button className="text-neutral-400 hover:text-neutral-600">⋮</button>
        </div>

        {/* Stats row (fake numbers for the look) */}
        <div className="mt-2 text-[11px] text-neutral-500 flex items-center gap-4">
          <span className="inline-flex items-center gap-1">⚙️ 4</span>
          <span className="inline-flex items-center gap-1">🔁 {data.count || "0/1"}</span>
        </div>
      </div>

      {/* Source / target handles */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-blue-400" />

      {/* Action pills below the card */}
      {Array.isArray(data.actions) && data.actions.length > 0 && (
        <div className="px-3 pb-3 flex flex-wrap gap-2">
          {data.actions.map((label, idx) => (
            <button
              key={idx}
              onClick={() => createChild(label)}
              className="text-[11px] rounded-xl border px-3 py-1 bg-white hover:bg-neutral-50 active:scale-[.98] shadow-sm"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => createChild("Next")}
            className="h-7 w-7 rounded-full border text-sm shadow-sm"
            title="Create child stage"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

const nodeTypes = { stage: StageNode };

// ---------- Initial graph (like your screenshot) ----------
const initialNodes = [
  {
    id: "1",
    type: "stage",
    position: { x: 240, y: 0 },
    data: { title: "Login", subtitle: "Stage Name", actions: ["Next"], count: "1/1" },
  },
  {
    id: "2",
    type: "stage",
    position: { x: 240, y: 150 },
    data: { title: "OTP", subtitle: "Stage Name", actions: ["Resend", "Verify"], count: "0/2" },
  },
  {
    id: "3",
    type: "stage",
    position: { x: 240, y: 320 },
    data: {
      title: "Home Page",
      subtitle: "Stage Name",
      actions: ["Personal Loan", "MSME Loan", "E-Bike Loan", "Used Car Loan"],
      count: "4/13",
    },
  },
  {
    id: "4",
    type: "stage",
    position: { x: 120, y: 520 },
    data: { title: "Intro Screen", subtitle: "Stage Name", actions: ["Next"], count: "2/2" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "Next", ...edgeDefaults },
  { id: "e2-3", source: "2", target: "3", label: "Verify", ...edgeDefaults },
  { id: "e3-4", source: "3", target: "4", label: "Personal Loan", ...edgeDefaults },
];

// ---------- Sidebar (draggable items) ----------
function Sidebar() {
  const onDragStart = (event, payload) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";
  };

  const Block = ({ title }) => (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, { type: "stage", title })}
      className="cursor-grab active:cursor-grabbing select-none rounded-xl border bg-white px-3 py-2 text-sm shadow-sm hover:shadow w-full"
    >
      {title}
    </div>
  );

  return (
    <aside className="w-64 border-l bg-neutral-50 h-full p-3 flex flex-col gap-3">
      <div className="text-sm font-semibold">Widgets</div>
      <details open className="rounded-xl bg-white border p-2">
        <summary className="cursor-pointer text-sm font-medium">Header</summary>
        <div className="mt-2 space-y-2">
          <Block title="Header" />
        </div>
      </details>

      <details className="rounded-xl bg-white border p-2">
        <summary className="cursor-pointer text-sm font-medium">Welcome Section</summary>
        <div className="mt-2 space-y-2">
          <Block title="Welcome" />
        </div>
      </details>

      <details className="rounded-xl bg-white border p-2">
        <summary className="cursor-pointer text-sm font-medium">Origination</summary>
        <div className="mt-2 space-y-2">
          <Block title="Stage" />
        </div>
      </details>

      <details className="rounded-xl bg-white border p-2">
        <summary className="cursor-pointer text-sm font-medium">Quick Links</summary>
        <div className="mt-2 space-y-2">
          <Block title="Quick Link" />
        </div>
      </details>

      <details className="rounded-xl bg-white border p-2">
        <summary className="cursor-pointer text-sm font-medium">Nav Bar</summary>
        <div className="mt-2 space-y-2">
          <Block title="Nav Bar" />
        </div>
      </details>

      <div className="text-[11px] text-neutral-500 mt-auto">
        Tip: drag any block into the canvas to create a new Stage.
      </div>
    </aside>
  );
}

// ---------- Main App ----------
export default function NodeGraphApp() {
  const wrapperRef = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...edgeDefaults, ...params }, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = wrapperRef.current.getBoundingClientRect();
      const payload = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");

      const position = {
        x: event.clientX - bounds.left - 80,
        y: event.clientY - bounds.top - 20,
      };

      const newId = genId();
      setNodes((nds) =>
        nds.concat({
          id: newId,
          type: "stage",
          position,
          data: { title: payload.title || "New Stage", subtitle: "Stage Name", actions: ["Next"], count: "0/1" },
        })
      );
    },
    [setNodes]
  );

  const fit = useCallback(() => {
    const el = document.querySelector("[data-id='react-flow-pane']");
    if (el) el.click();
  }, []);

  return (
    <div className="h-screen w-screen flex bg-neutral-100">
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-12 border-b bg-white flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <div className="text-base font-semibold">Journey Builder</div>
            <span className="text-xs text-neutral-500">(React Flow)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setNodes((nds) =>
                  nds.concat({
                    id: genId(),
                    type: "stage",
                    position: { x: 60 + Math.random() * 300, y: 60 + Math.random() * 200 },
                    data: { title: "New Stage", subtitle: "Stage Name", actions: ["Next"], count: "0/1" },
                  })
                )
              }
              className="rounded-xl border px-3 py-1 text-sm bg-white shadow-sm hover:bg-neutral-50"
            >
              + Add Stage
            </button>
            <button
              onClick={fit}
              className="rounded-xl border px-3 py-1 text-sm bg-white shadow-sm hover:bg-neutral-50"
            >
              Fit View
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1" ref={wrapperRef} onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
          >
            <MiniMap pannable zoomable />
            <Controls position="bottom-right" />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>
        </div>
      </div>

      {/* Right Sidebar */}
      <Sidebar />
    </div>
  );
}
