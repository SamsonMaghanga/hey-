'use client';
import { useState } from 'react';
import { contexts, services } from '../lib/content';
export default function SupportDirectory(){const [filter,setFilter]=useState('All');return <><label htmlFor="support-filter">Filter example support by context</label><select id="support-filter" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{contexts.map(c=><option key={c}>{c}</option>)}</select><div className="action-grid">{services.filter(s=>filter==='All'||s.context===filter).map(s=><article className="action" key={s.name}><p className="tag">EXAMPLE · UNVERIFIED</p><h2>{s.name}</h2><p>{s.description}</p><p className="fine">No live contact or booking. Find verified details on your institution’s official website.</p></article>)}</div></>}
