"use client"

import dynamic from "next/dynamic";
import * as THREE from "three";
import { GraphData } from "../../types/GraphData";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function GraphDemo({ graphData }: { graphData: GraphData }) {
  return (
    <div className="w-full h-[600px]">
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel="id"
        backgroundColor="rgba(0,0,0,0)"
        linkColor={() => "rgba(255,255,255,1)"}
        nodeThreeObject={({ id, image }) => {
          const imgTexture = new THREE.TextureLoader().load(image);
          imgTexture.colorSpace = THREE.SRGBColorSpace;

          // Image circular sprite
          const size = 256;
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = size;
          const ctx = canvas.getContext("2d")!;
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = "#fff";
          ctx.fill();
          const alphaMap = new THREE.CanvasTexture(canvas);
          alphaMap.colorSpace = THREE.SRGBColorSpace;

          const material = new THREE.SpriteMaterial({
            map: imgTexture,
            alphaMap,
            transparent: true,
          });

          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12, 1);

          // Text sprite
          const labelCanvas = document.createElement("canvas");
          const labelCtx = labelCanvas.getContext("2d")!;
          const fontSize = 64;
          labelCtx.font = `bold ${fontSize}px Arial`;
          const textWidth = labelCtx.measureText(String(id)).width;
          labelCanvas.width = textWidth;
          labelCanvas.height = fontSize * 1.4; // altura com margem

          labelCtx.font = `bold ${fontSize}px Arial`;
          labelCtx.textAlign = "center";
          labelCtx.textBaseline = "middle";
          labelCtx.fillStyle = "white";
          labelCtx.fillText(String(id), labelCanvas.width / 2, labelCanvas.height / 2);

          const labelTexture = new THREE.CanvasTexture(labelCanvas);
          const labelMaterial = new THREE.SpriteMaterial({
            map: labelTexture,
            transparent: true,
          });

          const label = new THREE.Sprite(labelMaterial);
          label.scale.set(20, 6, 1); // tamanho do texto
          label.position.set(0, -9, 0); // um pouquinho abaixo do nó

          // Group image + text
          const group = new THREE.Group();
          group.add(sprite);
          group.add(label);

          return group;
        }}
      />
    </div>
  );
}
