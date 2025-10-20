"use client"

import dynamic from "next/dynamic";
import * as THREE from "three";
import { ArtistNode, GraphData, GraphNode } from "../../types/GraphData";
import { Box, SpeedDial } from "@mui/material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useState } from "react";
import GraphSideMenu from "../GraphSideMenu/GraphSideMenu";
import { GRAPH_SIDE_MENU_WIDTH } from "../../constants/componentsConstants";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function GraphRenderer({ graphData }: { graphData: GraphData }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ArtistNode | undefined>(undefined);

  const setSelectedNodeAndOpenMenu = (node: GraphNode) => {
    const isArtistNode = (node: GraphNode): node is ArtistNode => {
      return (node as ArtistNode).profileUrl !== undefined;
    }
    
    if (node.isUser || !isArtistNode(node)) return; // Do not open side menu for user nodes

    setSelectedNode(node);
    setOpenSideMenu(true);
  };

  const handleCloseSideMenu = (): void => {
    setOpenSideMenu(false);
    setSelectedNode(undefined);
  };

  const goUpHandler = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        display="flex"
      >
        <ForceGraph3D
          width={openSideMenu ? window.innerWidth - GRAPH_SIDE_MENU_WIDTH : window.innerWidth}
          graphData={graphData}
          nodeAutoColorBy="group"
          nodeLabel="id"
          backgroundColor="rgba(0,0,0,0)"
          linkColor="rgba(255,255,255,1)"
          onNodeClick={(node) => setSelectedNodeAndOpenMenu(node as GraphNode)}
          nodeThreeObject={({ id, imageUrl }) => {
            const imgTexture = new THREE.TextureLoader().load(imageUrl);
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
        {openSideMenu && <GraphSideMenu node={selectedNode} onCloseMenu={handleCloseSideMenu} />}
      </Box>
      <SpeedDial
        ariaLabel="GoUp"
        icon={<KeyboardDoubleArrowUpIcon />}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16
        }}
        onClick={goUpHandler}
      />
    </>
  );
}
