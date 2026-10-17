import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {title:'Hey! — A little space for you',description:'A synthetic-data emotional well-being prototype.'};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body><a href="#main" className="skip">Skip to content</a><header><Link href="/" className="brand" aria-label="Hey! home">hey<span>!</span></Link><nav aria-label="Main navigation"><Link href="/">Check in</Link><Link href="/support">Campus support</Link><Link href="/help">Safety & help</Link></nav><span className="demo">DEMO · NO ACCOUNT</span></header><main id="main">{children}</main><footer><span className="brand">hey!</span><p>A little space. A small next step.</p><p>Synthetic demo only · Nothing is monitored · No clinical claims</p><Link href="/help">Privacy & safety information ↗</Link></footer></body></html>}
