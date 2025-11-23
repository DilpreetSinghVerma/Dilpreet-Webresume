import { useMousePosition } from '@/hooks/useMousePosition';
import { useEffect, useState } from 'react';

interface TrackedElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function CursorTracker() {
  const mousePosition = useMousePosition();
  const [elements, setElements] = useState<TrackedElement[]>([
    { id: 1, x: 10, y: 20, size: 300, speed: 0.05, opacity: 0.1, color: 'from-cyan-500' },
    { id: 2, x: 80, y: 10, size: 250, speed: 0.08, opacity: 0.08, color: 'from-purple-500' },
    { id: 3, x: 60, y: 80, size: 280, speed: 0.06, opacity: 0.07, color: 'from-cyan-500' },
    { id: 4, x: 20, y: 70, size: 260, speed: 0.07, opacity: 0.09, color: 'from-purple-500' },
    { id: 5, x: 90, y: 70, size: 240, speed: 0.04, opacity: 0.08, color: 'from-cyan-500' },
  ]);

  useEffect(() => {
    setElements(prev =>
      prev.map(el => {
        const dx = mousePosition.x - (window.innerWidth * el.x) / 100;
        const dy = mousePosition.y - (window.innerHeight * el.y) / 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / maxDistance) * el.speed * 40;
          
          return {
            ...el,
            x: el.x + Math.cos(angle + Math.PI) * force * 0.01,
            y: el.y + Math.sin(angle + Math.PI) * force * 0.01,
          };
        }

        return {
          ...el,
          x: el.x * 0.98 + 50 * 0.02,
          y: el.y * 0.98 + 50 * 0.02,
        };
      })
    );
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map(el => (
        <div
          key={el.id}
          className="absolute rounded-full blur-3xl transition-opacity duration-300"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            background: `radial-gradient(circle, hsl(var(--primary) / ${el.opacity}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
        />
      ))}

      {/* Floating particles that follow cursor */}
      {[...Array(3)].map((_, i) => {
        const offsetX = Math.cos((i * 2 * Math.PI) / 3) * 80;
        const offsetY = Math.sin((i * 2 * Math.PI) / 3) * 80;
        const x = mousePosition.x + offsetX;
        const y = mousePosition.y + offsetY;

        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: '8px',
              height: '8px',
              background: 'hsl(var(--primary) / 0.6)',
              boxShadow: '0 0 10px hsl(var(--primary) / 0.8)',
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)',
              opacity: 0.7,
            }}
          />
        );
      })}
    </div>
  );
}
