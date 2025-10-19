"use client"

import dynamic from "next/dynamic";
import * as THREE from "three";
import { GraphData } from "../../types/GraphData";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function GraphRenderer({ graphData }: { graphData: GraphData }) {
  return (
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
        labelCanvas.height = fontSize * 1.4;

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
        label.scale.set(20, 6, 1);
        label.position.set(0, -9, 0);

        // Group image + text
        const group = new THREE.Group();
        group.add(sprite);
        group.add(label);

        return group;
      }}
      linkThreeObjectExtend={true}
      linkThreeObject={(link) => {
        if (!link.label) {
          return new THREE.Object3D();
        }

        // Create a canvas for the link label
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        const fontSize = 32;
        context.font = `${fontSize}px Arial`;
        const text = link.label || ""; // Use a "label" property from the link data
        const textWidth = context.measureText(text).width;
        canvas.width = textWidth;
        canvas.height = fontSize * 1.4;

        context.font = `${fontSize}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "white";
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);

        sprite.scale.set(10, 5, 1); // Adjust size as needed
        return sprite;
      }}
      linkPositionUpdate={(sprite, { start, end }) => {
        // Position the label in the middle of the link
        if (sprite) {
          const middleX = (start.x + end.x) / 2;
          const middleY = (start.y + end.y) / 2;
          const middleZ = (start.z + end.z) / 2;
          sprite.position.set(middleX, middleY, middleZ);
        }
      }}
    />
  );
}
