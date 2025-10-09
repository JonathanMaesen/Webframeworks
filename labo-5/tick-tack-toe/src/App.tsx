import { useState } from "react";

type P = "X" | "O" | null;
const L:number[][] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const win = (s: P[]) => { for (const [a,b,c] of L) if (s[a] && s[a]===s[b] && s[a]===s[c]) return s[a]; return null; };

export default function App() {
    const [s, set] = useState<P[]>(Array(9).fill(null));
    const w = win(s), moves = s.filter(Boolean).length, next = (moves % 2 ? "O" : "X") as Exclude<P,null>;
    const status = w ? `Winner: ${w}` : moves === 9 ? "Draw" : `Next: ${next}`;

    return (
        <div style={{display:"grid",gap:12,placeItems:"center",padding:24,fontFamily:"system-ui,sans-serif"}}>
            <div style={{fontWeight:600}}>{status}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,80px)",gridAutoRows:"80px",gap:6}}>
                {s.map((v,i)=>(
                    <button
                        key={i}
                        onClick={()=>{
                            if (w || s[i]) return;
                            set(p => { const q=[...p]; q[i]=next; return q; });
                        }}
                        style={{fontSize:"2rem",fontWeight:700,border:"1px solid #aaa",background:"#fff",cursor:"pointer"}}
                        aria-label={`Square ${i+1}`}
                    >
                        {v}
                    </button>
                ))}
            </div>
            <button onClick={()=>set(Array(9).fill(null))} style={{padding:"8px 12px"}}>Reset</button>
        </div>
    );
}
