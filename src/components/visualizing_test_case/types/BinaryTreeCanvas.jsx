import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { useEffect, useRef, useCallback } from "react";

const BinaryTreeCanvas = observer(({ data }) => {
  const canvasRef = useRef(null);

  const drawTree = useCallback((ctx, data, width, height) => {
    ctx.clearRect(0, 0, width, height);
    if (data.length === 0) return;

    let d = data.length;
    let l = 0;
    while (d > 0) {
      d -= Math.pow(2, l);
      l++;
    }

    const size = Math.min(
      (2 * width) / (Math.pow(2, l) + 1),
      (2 * height) / (3 * l + 1)
    );

    const drawNode = (x, y, value, size) => {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize = size * 0.5;
      ctx.font = `${fontSize}px RopaSans`;
      ctx.fillText(value, x, y);
    };

    const drawTreeRecursive = (nodeIndex, x, y, offsetX, level) => {
      if (nodeIndex >= data.length) return;
      drawNode(x, y, data[nodeIndex], size);
      const nextLevelY = y + 1.5 * size;
      const nextOffsetX = offsetX / 2;
      drawTreeRecursive(2 * nodeIndex + 1, x - nextOffsetX, nextLevelY, nextOffsetX, level + 1);
      drawTreeRecursive(2 * nodeIndex + 2, x + nextOffsetX, nextLevelY, nextOffsetX, level + 1);

      if (2 * nodeIndex + 1 < data.length) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x - nextOffsetX, nextLevelY - size / 2);
        ctx.stroke();
      }
      if (2 * nodeIndex + 2 < data.length) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x + nextOffsetX, nextLevelY - size / 2);
        ctx.stroke();
      }
    };

    drawTreeRecursive(0, width / 2, size, width / 2, 0);
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawTree(ctx, data, canvas.width, canvas.height);
    };

    const handleResize = () => {
      requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, drawTree]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        marginBottom: 30,
        width: '100%',
        height: 'auto',
      }}
    />
  );
});

BinaryTreeCanvas.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BinaryTreeCanvas;
