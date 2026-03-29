import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import ParticleScene from '@/components/ParticleScene';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor/Cursor';

export const metadata: Metadata = {
  title: 'Yoekii | Agentic AI Platform',
  description: 'Yoekii is a high-performance, immersive Agentic AI platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="scroll-progress"></div>
        <SmoothScroll>
          <Cursor />
          <Navbar />
          <ParticleScene />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
