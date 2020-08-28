import React, {useState, useCallback, useRef} from "react";
import produce from "immer"


const numRows = 25;
const numCols = 30;
const neighborpositions=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
let generations = 0;
let playSpeed = 500;

function Grid(){
    const [playing, setPlaying] = useState(false)
    const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
    }
    return rows;
});
const playingRef = useRef(playing)
playingRef.current = playing
const play = useCallback(()=>{
    if(!playingRef.current){
        return
    }
    generations = generations + 1
    setGrid((oldgrid)=>{
        return produce(oldgrid, gridCopy => {
            for(let i=0; i< numRows; i++){
                for (let j = 0; j < numCols; j++){
                    let nb = 0;
                    neighborpositions.forEach(([x, y])=>{
                        const nI = i+x;
                        const nJ = j+y;
                        if (nI >= 0 && nI < numRows && nJ >= 0 && nJ < numCols){
                            nb += oldgrid[nI][nJ]
                        }
                    })
                    if (nb < 2 || nb > 3){
                        gridCopy[i][j] = 0;
                    } else if(oldgrid[i][j] === 0 && nb === 3){
                        gridCopy[i][j] = 1
                    }
                }
            }
        })
    })
    setTimeout(play, playSpeed)
},[])
    return(<div className="game"><div className="buttons">
        <button onClick={()=>{setPlaying(true); playingRef.current = true; play()}}>Start Game</button>
        <button onClick={()=>{setPlaying(false); playingRef.current = false;}}>Stop Game</button>
        <button onClick={()=>setGrid(() => {
            const rows = []
            generations = 0;
            for (let i = 0; i< numRows; i++){
                rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
            }
            return rows;
        })}>Reset Game</button>
        <button onClick={()=>setGrid((oldgrid)=>{
          generations = 0;
          return produce(oldgrid, gridCopy => {
              for (var j = 0; j < numRows; j++) {
                  for (var k = 0; k < numCols; k++) {
                      var rawRandom = Math.random();
                      var improvedNum = (rawRandom * 2);
                      var randomBinary = Math.floor(improvedNum);
                      if (randomBinary === 1) {
                          gridCopy[j][k] = 1;
                      } else {
                          gridCopy[j][k] = 0;
                      }
                  }
              }
          })})}>Randomize</button>
        <button onClick={()=>setGrid((oldgrid)=>{
            generations = generations + 0.5
            return produce(oldgrid, gridCopy => {
                for(let i=0; i< numRows; i++){
                    for (let j = 0; j < numCols; j++){
                        let nb = 0;
                        neighborpositions.forEach(([x, y])=>{
                            const nI = i+x;
                            const nJ = j+y;
                            if (nI >= 0 && nI < numRows && nJ >= 0 && nJ < numCols){
                                nb += oldgrid[nI][nJ]
                            }
                        })
                        if (nb < 2 || nb > 3){
                            gridCopy[i][j] = 0;
                        } else if(oldgrid[i][j] === 0 && nb === 3){
                            gridCopy[i][j] = 1
                        }}}})})}>1 Gen</button>
        <button onClick={()=>playSpeed = Math.max((playSpeed - 100),100)}>Faster</button>
        <button onClick={()=>playSpeed = Math.min((playSpeed + 100),1000)}>Slower</button></div>
        <div className="generations">Generation #{generations}</div>
        <div className="grid" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 15px)`}}>
            {grid.map((row, i )=> {
                return(
                    row.map((col, k) => {
                        return(
                            <div key={`${i}-${k}`} style={{width: 15, height: 14, backgroundColor: grid[i][k] ? 'orange' : undefined, border: '.2px solid black'}}  onClick={()=>{
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                                })
                                setGrid(newGrid)
                            }}/>
                        )
                    })
                )
            })}
        </div>
    </div>)
}

export default Grid;
