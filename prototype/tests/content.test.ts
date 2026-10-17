import { describe,it,expect } from 'vitest';
import {actions,contexts,emotions,mapCheckIn} from '../lib/content';
describe('transparent mapping',()=>{
 it('has seven original actions',()=>expect(Object.keys(actions)).toHaveLength(7));
 it('returns two distinct valid actions for every supported combination',()=>{for(const emotion of emotions)for(const context of ['',...contexts] as const){const r=mapCheckIn(emotion,context);expect(r.ids).toHaveLength(2);expect(new Set(r.ids).size).toBe(2);r.ids.forEach(id=>expect(actions[id].text.length).toBeGreaterThan(20));expect(r.reflection).toBeTruthy()}});
 it('prioritizes practical support for finances and housing',()=>{expect(mapCheckIn('Good','Finances').ids[0]).toBe('practical');expect(mapCheckIn('Low','Housing').ids[0]).toBe('practical')});
 it('uses emotion defaults without a context and deduplicates overrides',()=>{expect(mapCheckIn('Lonely','').ids).toEqual(['reach','familiar']);expect(mapCheckIn('Lonely','Relationships').ids).toEqual(['reach','familiar']);expect(mapCheckIn('Good','Study').ids).toEqual(['study','pause'])});
});
