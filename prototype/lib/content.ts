export const emotions = ['Overwhelmed', 'Low', 'Lonely', 'Okay', 'Good'] as const;
export type Emotion = typeof emotions[number];
export const contexts = ['Study', 'Relationships', 'Finances', 'Housing', 'Homesickness', 'General well-being'] as const;
export type Context = typeof contexts[number];
export const actions = {
  ground: {title:'Find your surroundings',time:'1 minute',text:'If comfortable, place your feet on the floor. Notice three colors around you and two sounds. Stop whenever you like.'},
  write: {title:'Put one thought on paper',time:'2 minutes',text:'Try an invented sentence: “Today feels full because…” Then add one thing that could wait. Use the demo reflection space below.'},
  reach: {title:'Make a small connection',time:'2 minutes',text:'Think of someone you trust. Draft a simple message: “Would you have time for a catch-up?” You choose whether to send it outside this demo.'},
  study: {title:'Shrink the next task',time:'3 minutes',text:'Choose one study task. Write only its first small step, such as opening the reading list. You can stop after that step.'},
  practical: {title:'Name one practical question',time:'3 minutes',text:'Write one question about money or housing and identify which official university team could answer it. You do not need to solve everything now.'},
  familiar: {title:'Bring a little home closer',time:'2 minutes',text:'Think of a familiar song, food or place. Choose one small way to make room for it today, if that feels welcome.'},
  pause: {title:'Keep a little breathing room',time:'1 minute',text:'Notice one ordinary thing you would like to make space for today: a drink of water, a stretch or a quiet pause. Pick what suits you.'},
} as const;
export type ActionId = keyof typeof actions;
const rules: Record<Emotion,{reflection:string;ids:ActionId[]}> = {
  Overwhelmed:{reflection:'There may be a lot asking for your attention. You can choose just one small next step, or pause here.',ids:['ground','study']},
  Low:{reflection:'You do not need to turn this feeling into a task. If you want, choose something gentle and manageable.',ids:['write','pause']},
  Lonely:{reflection:'Being away from familiar people can feel difficult. You can decide what kind of connection feels comfortable.',ids:['reach','familiar']},
  Okay:{reflection:'There is room for an ordinary day here too. You might notice what you need next, without changing how you feel.',ids:['pause','write']},
  Good:{reflection:'You can make room for what feels good today. There is no need to make it productive.',ids:['pause','reach']},
};
const overrides: Record<Context,ActionId> = {Study:'study',Relationships:'reach',Finances:'practical',Housing:'practical',Homesickness:'familiar','General well-being':'pause'};
export function mapCheckIn(emotion:Emotion, context:Context|'') {
  const rule = rules[emotion];
  return {reflection:rule.reflection, ids:[...new Set<ActionId>([...(context ? [overrides[context]] : []),...rule.ids])].slice(0,2), reason:context ? `${context} selects the first action; ${emotion.toLowerCase()} supplies the remaining option.` : `${emotion} selects these two preset options. No text is analyzed.`};
}
export const services: {name:string;context:Context;description:string}[] = [
  {name:'Study skills team',context:'Study',description:'Example guidance on planning coursework and asking about academic support.'},
  {name:'Student listening service',context:'Relationships',description:'Example of a place to ask about confidential human support and its limits.'},
  {name:'Student money advice',context:'Finances',description:'Example guidance on budgets and questions about hardship support.'},
  {name:'Housing advice desk',context:'Housing',description:'Example help understanding accommodation questions.'},
  {name:'International student office',context:'Homesickness',description:'Example guidance on settling in and finding student communities.'},
  {name:'Student well-being team',context:'General well-being',description:'Example information about campus well-being options.'},
];
