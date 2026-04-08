import { useRef, useState, useEffect } from 'react';
import { RotateCcw, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DrawingCanvas({ onSubmit, disabled = false, placeholder = 'Écrivez ici avec le doigt' }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8faf9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPlaceholder(ctx, canvas, placeholder);
  }, []);

  const drawPlaceholder = (ctx, canvas, text) => {
    ctx.fillStyle = '#a0adb8';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    if (disabled) return;
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e, canvasRef.current);
    if (!hasContent) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f8faf9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHasContent(true);
    }
  };

  const draw = (e) => {
    if (!isDrawing || disabled) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#1a2e2a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDraw = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8faf9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPlaceholder(ctx, canvas, placeholder);
    setHasContent(false);
  };

  const submit = () => {
    if (!hasContent) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSubmit(dataUrl);
  };

  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden border-2 border-border bg-muted/30">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <Pen className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={clear} className="flex-1 rounded-xl h-11" type="button">
          <RotateCcw className="w-4 h-4 mr-2" /> Effacer
        </Button>
        <Button onClick={submit} disabled={!hasContent || disabled} className="flex-1 rounded-xl h-11" type="button">
          Vérifier l'écriture
        </Button>
      </div>
    </div>
  );
}