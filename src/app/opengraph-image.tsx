import { ImageResponse } from 'next/og';
import cv from '@/data/cv.json';

export const alt = `${cv.profile.name} — Desarrollador Fullstack .NET y React`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Tarjeta para compartir en redes (1200×630) con la estética del sitio
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#050505',
          color: '#f4f1ec',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            letterSpacing: 4,
            color: '#ff5a36',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          <div style={{ width: 40, height: 2, background: '#ff5a36' }} />
          Ingeniero de Sistemas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, lineHeight: 1.05, fontWeight: 300 }}>
            {cv.profile.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 20, color: '#9a958f' }}>
            Desarrollador fullstack · .NET · SQL Server · React
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#9a958f',
            fontFamily: 'monospace',
            borderTop: '1px solid #262626',
            paddingTop: 28,
          }}
        >
          <span>Santa Marta, Colombia</span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#ff5a36',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: '#ff5a36',
              }}
            />
            Disponible
          </span>
        </div>
      </div>
    ),
    size,
  );
}
