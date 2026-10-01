import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSmoothScroll } from '../smooth-scroll/SmoothScrollProvider';
import { RefreshCw, Eye, Move } from 'lucide-react';

export type PolyhedronType = 'stellated' | 'geodesic' | 'crystal' | 'tesseract' | 'torus';

interface KineticPolyhedronProps {
  initialType?: PolyhedronType;
  size?: number;
  glowColor?: string;
  wireframeOnly?: boolean;
  className?: string;
  showControls?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point4D {
  x: number;
  y: number;
  z: number;
  w: number;
}

interface Face {
  indices: number[];
  normal?: Point3D;
  depth?: number;
  color?: string;
}

const POLYHEDRON_NAMES: Record<PolyhedronType, { label: string; desc: string; domainColor: string }> = {
  stellated: {
    label: 'STELLATED QUANTUM STAR',
    desc: '60-Facet Non-Convex Polyhedral Matrix',
    domainColor: '#ff4f36',
  },
  geodesic: {
    label: 'GEODESIC DODECAHEDRON',
    desc: '32-Vertex Truncated Fullerene Lattice',
    domainColor: '#3687ff',
  },
  crystal: {
    label: 'CRYSTALLINE DUAL PRISM',
    desc: '24-Facet Refractive Diamond Bipyramid',
    domainColor: '#ff4f36',
  },
  tesseract: {
    label: '4D HYPERCUBE TESSERACT',
    desc: '16-Vertex 4-Dimensional Orthogonal Projection',
    domainColor: '#3687ff',
  },
  torus: {
    label: 'POLYGONAL TORUS KNOT',
    desc: 'Helical Mobius Topology Ribbon',
    domainColor: '#ff4f36',
  },
};

export const KineticPolyhedron: React.FC<KineticPolyhedronProps> = ({
  initialType = 'stellated',
  size = 360,
  glowColor = '#00f0ff',
  wireframeOnly = false,
  className = '',
  showControls = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [polyType, setPolyType] = useState<PolyhedronType>(initialType);
  const [wireframe, setWireframe] = useState<boolean>(wireframeOnly);
  const isHoveredRef = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { getVelocity } = useSmoothScroll();
  const getVelocityRef = useRef(getVelocity);
  getVelocityRef.current = getVelocity;

  const isVisibleRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotational state with spring physics
  const rotRef = useRef({
    x: 0.4,
    y: 0.6,
    z: 0.1,
    vx: 0.006,
    vy: 0.009,
    vz: 0.002,
    angle4D: 0,
  });

  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    lastX: 0,
    lastY: 0,
  });

  const shockwaveRef = useRef<{ radius: number; maxRadius: number; alpha: number } | null>(null);

  // Switch to next polyhedral geometry with a shockwave
  const cycleGeometry = useCallback(() => {
    const keys: PolyhedronType[] = ['stellated', 'geodesic', 'crystal', 'tesseract', 'torus'];
    const nextIdx = (keys.indexOf(polyType) + 1) % keys.length;
    setPolyType(keys[nextIdx]);
    shockwaveRef.current = { radius: 10, maxRadius: size * 0.7, alpha: 1 };
  }, [polyType, size]);

  // Construct mathematical 3D geometry models
  const getGeometry = useCallback((type: PolyhedronType, angle4D: number): { vertices: Point3D[]; faces: Face[] } => {
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.618

    if (type === 'stellated') {
      // Base Icosahedron vertices
      const baseVertices: Point3D[] = [
        { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 },
        { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
        { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi },
        { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
        { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 },
        { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 },
      ];

      // Base Icosahedron triangular faces
      const icosaFaces = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
      ];

      // Stellate: add an apex point outwards on each of the 20 faces
      const vertices: Point3D[] = [...baseVertices];
      const faces: Face[] = [];
      const stellationFactor = 1.75;

      icosaFaces.forEach((tri) => {
        const v0 = baseVertices[tri[0]];
        const v1 = baseVertices[tri[1]];
        const v2 = baseVertices[tri[2]];
        const cx = (v0.x + v1.x + v2.x) / 3 * stellationFactor;
        const cy = (v0.y + v1.y + v2.y) / 3 * stellationFactor;
        const cz = (v0.z + v1.z + v2.z) / 3 * stellationFactor;
        const apexIdx = vertices.length;
        vertices.push({ x: cx, y: cy, z: cz });

        // 3 sub-triangles per face
        faces.push({ indices: [tri[0], tri[1], apexIdx] });
        faces.push({ indices: [tri[1], tri[2], apexIdx] });
        faces.push({ indices: [tri[2], tri[0], apexIdx] });
      });

      return { vertices, faces };
    }

    if (type === 'geodesic') {
      // Dodecahedron vertices (20 vertices, 12 pentagonal faces)
      const invPhi = 1 / phi;
      const vertices: Point3D[] = [
        { x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: -1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 },
        { x: -1, y: 1, z: 1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 }, { x: -1, y: -1, z: -1 },
        { x: 0, y: invPhi, z: phi }, { x: 0, y: invPhi, z: -phi }, { x: 0, y: -invPhi, z: phi }, { x: 0, y: -invPhi, z: -phi },
        { x: invPhi, y: phi, z: 0 }, { x: invPhi, y: -phi, z: 0 }, { x: -invPhi, y: phi, z: 0 }, { x: -invPhi, y: -phi, z: 0 },
        { x: phi, y: 0, z: invPhi }, { x: phi, y: 0, z: -invPhi }, { x: -phi, y: 0, z: invPhi }, { x: -phi, y: 0, z: -invPhi },
      ];

      const faces: Face[] = [
        { indices: [0, 8, 10, 2, 16] },
        { indices: [0, 16, 17, 1, 12] },
        { indices: [0, 12, 14, 4, 8] },
        { indices: [4, 14, 5, 19, 18] },
        { indices: [4, 18, 6, 10, 8] },
        { indices: [1, 17, 3, 11, 9] },
        { indices: [1, 9, 5, 14, 12] },
        { indices: [2, 10, 6, 15, 13] },
        { indices: [2, 13, 3, 17, 16] },
        { indices: [7, 11, 3, 13, 15] },
        { indices: [7, 15, 6, 18, 19] },
        { indices: [7, 19, 5, 9, 11] },
      ];

      return { vertices, faces };
    }

    if (type === 'crystal') {
      // Dual Hexagonal Bipyramid Diamond
      const vertices: Point3D[] = [
        { x: 0, y: 2.1, z: 0 }, // Top Apex
        { x: 0, y: -2.1, z: 0 }, // Bottom Apex
      ];
      // Mid ring of 6 vertices
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI * 2) / 6;
        vertices.push({ x: Math.cos(ang) * 1.5, y: 0.35, z: Math.sin(ang) * 1.5 });
        vertices.push({ x: Math.cos(ang + Math.PI / 6) * 1.1, y: -0.35, z: Math.sin(ang + Math.PI / 6) * 1.1 });
      }

      const faces: Face[] = [];
      // Connect top apex to upper ring
      for (let i = 0; i < 6; i++) {
        const vCurr = 2 + i * 2;
        const vNext = 2 + ((i + 1) % 6) * 2;
        faces.push({ indices: [0, vCurr, vNext] });
      }
      // Connect bottom apex to lower ring
      for (let i = 0; i < 6; i++) {
        const vCurr = 3 + i * 2;
        const vNext = 3 + ((i + 1) % 6) * 2;
        faces.push({ indices: [1, vNext, vCurr] });
      }
      // Connect mid ring facets
      for (let i = 0; i < 6; i++) {
        const u1 = 2 + i * 2;
        const u2 = 2 + ((i + 1) % 6) * 2;
        const b1 = 3 + i * 2;
        faces.push({ indices: [u1, b1, u2] });
      }

      return { vertices, faces };
    }

    if (type === 'tesseract') {
      // 4D Hypercube with 16 vertices rotated in 4D space
      const vertices4D: Point4D[] = [];
      for (let i = 0; i < 16; i++) {
        vertices4D.push({
          x: (i & 1 ? 1 : -1) * 1.1,
          y: (i & 2 ? 1 : -1) * 1.1,
          z: (i & 4 ? 1 : -1) * 1.1,
          w: (i & 8 ? 1 : -1) * 1.1,
        });
      }

      // Rotate in 4D XW and ZW planes
      const cosA = Math.cos(angle4D);
      const sinA = Math.sin(angle4D);
      const vertices: Point3D[] = vertices4D.map((p) => {
        // Rotate X-W
        const xRot = p.x * cosA - p.w * sinA;
        const wRot = p.x * sinA + p.w * cosA;
        // Project 4D to 3D with perspective
        const distance4D = 2.4;
        const f4 = 1 / (distance4D - wRot * 0.45);
        return {
          x: xRot * f4 * 2.2,
          y: p.y * f4 * 2.2,
          z: p.z * f4 * 2.2,
        };
      });

      // 24 square faces of 4D hypercube
      const faces: Face[] = [];
      // 6 faces of inner cube (w = -1)
      faces.push({ indices: [0, 1, 3, 2] });
      faces.push({ indices: [4, 5, 7, 6] });
      faces.push({ indices: [0, 1, 5, 4] });
      faces.push({ indices: [2, 3, 7, 6] });
      faces.push({ indices: [0, 2, 6, 4] });
      faces.push({ indices: [1, 3, 7, 5] });
      // 6 faces of outer cube (w = 1)
      faces.push({ indices: [8, 9, 11, 10] });
      faces.push({ indices: [12, 13, 15, 14] });
      faces.push({ indices: [8, 9, 13, 12] });
      faces.push({ indices: [10, 11, 15, 14] });
      faces.push({ indices: [8, 10, 14, 12] });
      faces.push({ indices: [9, 11, 15, 13] });
      // Connecting square pillars
      for (let i = 0; i < 4; i++) {
        const next = (i + 1) % 4;
        faces.push({ indices: [i, next, next + 8, i + 8] });
        faces.push({ indices: [i + 4, next + 4, next + 12, i + 12] });
      }

      return { vertices, faces };
    }

    // Default: Torus Knot Helix
    const vertices: Point3D[] = [];
    const faces: Face[] = [];
    const segments = 24;
    const tubeSegments = 6;
    const R = 1.35; // Major radius
    const r = 0.55; // Minor radius

    for (let i = 0; i < segments; i++) {
      const u = (i * Math.PI * 2) / segments;
      const cu = Math.cos(u);
      const su = Math.sin(u);

      for (let j = 0; j < tubeSegments; j++) {
        const v = (j * Math.PI * 2) / tubeSegments;
        const cv = Math.cos(v);
        const sv = Math.sin(v);

        vertices.push({
          x: (R + r * cv) * cu,
          y: (R + r * cv) * su,
          z: r * sv,
        });
      }
    }

    for (let i = 0; i < segments; i++) {
      const nextI = (i + 1) % segments;
      for (let j = 0; j < tubeSegments; j++) {
        const nextJ = (j + 1) % tubeSegments;
        const p1 = i * tubeSegments + j;
        const p2 = nextI * tubeSegments + j;
        const p3 = nextI * tubeSegments + nextJ;
        const p4 = i * tubeSegments + nextJ;
        faces.push({ indices: [p1, p2, p3, p4] });
      }
    }

    return { vertices, faces };
  }, []);

  // Mouse / Touch Interaction Listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left - rect.width / 2;
      const clientY = e.clientY - rect.top - rect.height / 2;

      mouseRef.current.targetX = clientX / (rect.width / 2);
      mouseRef.current.targetY = clientY / (rect.height / 2);

      if (isDragging) {
        const dx = e.clientX - mouseRef.current.lastX;
        const dy = e.clientY - mouseRef.current.lastY;
        rotRef.current.y += dx * 0.008;
        rotRef.current.x += dy * 0.008;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      setIsDragging(true);
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    const handlePointerEnter = () => {
      isHoveredRef.current = true;
    };
    const handlePointerLeave = () => {
      isHoveredRef.current = false;
      setIsDragging(false);
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isDragging]);

  // Main 3D Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // Satellites orbiting in 3D around the poly
    const satellites = Array.from({ length: 14 }).map((_, i) => ({
      radius: 1.85 + (i % 3) * 0.25,
      speed: 0.015 + (i % 4) * 0.005,
      phase: (i * Math.PI * 2) / 14,
      size: 2.2 + (i % 2) * 1.5,
      color: i % 2 === 0 ? '#ff4f36' : '#3687ff',
    }));

    const render = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const centerX = size / 2;
      const centerY = size / 2;
      const focalLength = size * 0.85;

      // Mouse orientation spring interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Scroll velocity influence (momentum spin acceleration)
      const currentVelocity = getVelocityRef.current();
      const currentSpeed = Math.abs(currentVelocity);
      const scrollImpulse = currentVelocity * 0.003;
      const speedScale = 1 + Math.min(currentSpeed * 0.05, 1.5);

      if (!isDragging) {
        rotRef.current.x += (rotRef.current.vx + mouseRef.current.y * 0.01 + scrollImpulse * 0.5) * speedScale;
        rotRef.current.y += (rotRef.current.vy + mouseRef.current.x * 0.01 + scrollImpulse) * speedScale;
        rotRef.current.z += rotRef.current.vz * speedScale;
      }
      rotRef.current.angle4D += 0.012 * speedScale;

      const { vertices, faces } = getGeometry(polyType, rotRef.current.angle4D);

      // 3D Rotation Matrix Calculation
      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);
      const cosZ = Math.cos(rotRef.current.z);
      const sinZ = Math.sin(rotRef.current.z);

      // Rotate & Project 3D Vertices
      const projected = vertices.map((v) => {
        // Rotate around Y
        let x1 = v.x * cosY + v.z * sinY;
        let y1 = v.y;
        let z1 = -v.x * sinY + v.z * cosY;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate around Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const scale = focalLength / (focalLength + z3 * 55 + 240);
        return {
          sx: centerX + x3 * 68 * scale,
          sy: centerY + y3 * 68 * scale,
          z: z3,
          scale,
        };
      });

      // Dynamic Light Vector (Influenced by cursor spotlight)
      const lightX = 0.5 + mouseRef.current.x * 0.4;
      const lightY = -0.7 + mouseRef.current.y * 0.4;
      const lightZ = -1.0;
      const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
      const lx = lightX / lightLen;
      const ly = lightY / lightLen;
      const lz = lightZ / lightLen;

      // Calculate Face Normals & Sort Faces by Z Depth (Painter's Algorithm)
      const sortedFaces = faces.map((face) => {
        const p0 = projected[face.indices[0]];
        const p1 = projected[face.indices[1]];
        const p2 = projected[face.indices[2]];

        // Normal via cross product in screen space
        const ax = p1.sx - p0.sx;
        const ay = p1.sy - p0.sy;
        const bx = p2.sx - p0.sx;
        const by = p2.sy - p0.sy;
        const crossZ = ax * by - ay * bx;

        let avgZ = 0;
        face.indices.forEach((idx) => {
          avgZ += projected[idx].z;
        });
        avgZ /= face.indices.length;

        return {
          face,
          avgZ,
          crossZ,
        };
      });

      // Sort back-to-front
      sortedFaces.sort((a, b) => b.avgZ - a.avgZ);

      // Ambient Central Holographic Core Glow
      const ambientGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, size * 0.45);
      const activeColor = POLYHEDRON_NAMES[polyType].domainColor;
      ambientGlow.addColorStop(0, `${activeColor}40`);
      ambientGlow.addColorStop(0.5, `${glowColor}15`);
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Orbiting Satellites in Background (Behind Polyhedron)
      satellites.forEach((sat) => {
        sat.phase += sat.speed * speedScale;
        const sx = centerX + Math.cos(sat.phase) * sat.radius * 60;
        const sy = centerY + Math.sin(sat.phase) * Math.sin(rotRef.current.x) * sat.radius * 60;
        const sz = Math.sin(sat.phase) * Math.cos(rotRef.current.x);

        if (sz < 0) {
          ctx.beginPath();
          ctx.arc(sx, sy, sat.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `${sat.color}60`;
          ctx.fill();
        }
      });

      // Render Polygons (Facets + Wireframe)
      sortedFaces.forEach(({ face, crossZ }) => {
        const pts = face.indices.map((idx) => projected[idx]);
        if (pts.length < 3) return;

        ctx.beginPath();
        ctx.moveTo(pts[0].sx, pts[0].sy);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].sx, pts[i].sy);
        }
        ctx.closePath();

        // Shading: Front-facing vs Back-facing
        const isFrontFacing = crossZ < 0;

        if (!wireframe) {
          // Calculate lighting intensity
          const diffuse = Math.max(0.12, (crossZ < 0 ? -crossZ : crossZ) / 1200);
          const lightFactor = Math.min(1, Math.max(0.15, diffuse * (lx * 0.5 + ly * 0.5 + lz * 0.8)));

          if (isFrontFacing) {
            // Front-facing illuminated glass facet
            ctx.fillStyle = `${activeColor}${Math.floor(lightFactor * 45 + 20).toString(16).padStart(2, '0')}`;
          } else {
            // Back-facing translucent twilight facet
            ctx.fillStyle = `${glowColor}10`;
          }
          ctx.fill();
        }

        // Cybernetic Wireframe Stroke
        ctx.strokeStyle = isFrontFacing ? `${activeColor}${isHoveredRef.current ? 'cc' : '88'}` : `${glowColor}30`;
        ctx.lineWidth = isFrontFacing ? 1.4 : 0.8;
        ctx.stroke();
      });

      // Render Luminous Glowing Vertices on Front-Facing Nodes
      projected.forEach((p) => {
        if (p.z > -0.3) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 2.2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = activeColor;
          ctx.shadowColor = activeColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Render 3D Orbiting Satellites in Foreground (In Front of Polyhedron)
      satellites.forEach((sat) => {
        const sx = centerX + Math.cos(sat.phase) * sat.radius * 60;
        const sy = centerY + Math.sin(sat.phase) * Math.sin(rotRef.current.x) * sat.radius * 60;
        const sz = Math.sin(sat.phase) * Math.cos(rotRef.current.x);

        if (sz >= 0) {
          ctx.beginPath();
          ctx.arc(sx, sy, sat.size, 0, Math.PI * 2);
          ctx.fillStyle = sat.color;
          ctx.shadowColor = sat.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Render Expanding Shockwave on Click/Morph
      if (shockwaveRef.current) {
        const sw = shockwaveRef.current;
        sw.radius += (sw.maxRadius - sw.radius) * 0.12;
        sw.alpha *= 0.92;

        ctx.beginPath();
        ctx.arc(centerX, centerY, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${activeColor}${Math.floor(sw.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (sw.alpha < 0.02) {
          shockwaveRef.current = null;
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [polyType, wireframe, isDragging, size, glowColor, getGeometry]);

  const currentMeta = POLYHEDRON_NAMES[polyType];

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 3D Canvas Stage */}
      <canvas
        ref={canvasRef}
        onClick={cycleGeometry}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none outline-none focus:outline-none focus-visible:outline-none transition-transform duration-300 hover:scale-105"
      />

      {/* Floating HUD Badges & Interactive Controls */}
      {showControls && (
        <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 w-max max-w-full px-2 z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16191d]/90 border border-white/[0.08] backdrop-blur-md text-[10px] sm:text-xs font-mono shadow-2xl">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: currentMeta.domainColor }}
            />
            <span className="text-white font-bold tracking-wider">{currentMeta.label}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 hidden sm:inline">{currentMeta.desc}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={cycleGeometry}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181b20] hover:bg-[#ff4f36] border border-[#ff4f36]/40 hover:border-[#ff4f36] text-[#ff4f36] hover:text-[#101214] text-[10px] font-mono font-bold transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(255,79,54,0.4)]"
            >
              <RefreshCw className="w-2.5 h-2.5 animate-spin-reverse" />
              <span>MORPH (CLICK)</span>
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-mono font-bold transition-all hover:scale-105 active:scale-95 ${
                wireframe
                  ? 'bg-[#3687ff] border-[#3687ff] text-white shadow-[0_0_15px_rgba(54,135,255,0.4)]'
                  : 'bg-[#181b20] border-white/10 text-slate-400 hover:text-white hover:border-[#3687ff]'
              }`}
            >
              <Eye className="w-2.5 h-2.5" />
              <span>{wireframe ? 'WIREFRAME' : 'GLASS SOLID'}</span>
            </button>

            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#14161a] border border-white/5 text-[9px] font-mono text-slate-400">
              <Move className="w-2.5 h-2.5 text-[#3687ff]" />
              <span>DRAG TO TILT</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
