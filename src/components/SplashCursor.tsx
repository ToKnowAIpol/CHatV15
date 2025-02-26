
import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  paused?: boolean;
}

export function SplashCursor({
  simResolution = 128,
  dyeResolution = 1024,
  densityDissipation = 0.97,
  velocityDissipation = 0.98,
  pressure = 0.8,
  pressureIterations = 20,
  curl = 30,
  splatRadius = 0.25,
  splatForce = 6000,
  shading = true,
  colorUpdateSpeed = 10,
  paused = false,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up WebGL context
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: true,
      preserveDrawingBuffer: false
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Initialize canvas size
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create shaders and programs
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D texture;
      uniform vec2 resolution;
      
      void main() {
        vec2 coord = gl_FragCoord.xy / resolution;
        vec4 color = texture2D(texture, coord);
        gl_FragColor = vec4(color.rgb, 0.95);
      }
    `);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Set up geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Animation state
    let lastTime = 0;
    let pointerDown = false;
    let pointerX = 0;
    let pointerY = 0;
    let velocityX = 0;
    let velocityY = 0;

    // Animation loop
    const animate = (time: number) => {
      if (paused) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      if (pointerDown) {
        const force = splatForce * deltaTime;
        velocityX += force * (Math.random() - 0.5);
        velocityY += force * (Math.random() - 0.5);
      }

      gl.uniform2f(
        gl.getUniformLocation(program, 'resolution'),
        canvas.width,
        canvas.height
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      requestAnimationFrame(animate);
    };

    // Handle interactions
    const handlePointerDown = (e: PointerEvent) => {
      pointerDown = true;
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const dx = e.clientX - pointerX;
      const dy = e.clientY - pointerY;
      pointerX = e.clientX;
      pointerY = e.clientY;
      velocityX = dx;
      velocityY = dy;
    };

    const handlePointerUp = () => {
      pointerDown = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerout', handlePointerUp);

    // Start animation
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerout', handlePointerUp);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [
    simResolution,
    dyeResolution,
    densityDissipation,
    velocityDissipation,
    pressure,
    pressureIterations,
    curl,
    splatRadius,
    splatForce,
    shading,
    colorUpdateSpeed,
    paused,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{
        background: 'transparent',
        touchAction: 'none',
      }}
    />
  );
}
