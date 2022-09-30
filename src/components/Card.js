import React, {useState, useEffect, forwardRef} from 'react'
import styled, {keyframes} from 'styled-components' 

const scoreAnimate = keyframes`
    0%, 100%{
        transform: translateY(0px);
        opacity: 1;
    }
    50%{
        transform: translateY(-7px);
        opacity: .3;
    }
    `
const scoreA = styled.div`
        animation: ${scoreAnimate} 0.5s;
    `
const RankMove = styled.div``

const Card = forwardRef((props, ref) => {
    const [count, setCount] = useState(0)
    
    if(count === 0) setCount(props.score)
    
    let ScoreTag = props.update ? scoreA : RankMove

    // counter increase animation
    useEffect(() => {
        const interval = setInterval(() => { 
            if(count >= props.score) return 
            setCount(prev => prev + 1 + Math.floor( ( props.score - count) / 10) )
        }, 100);
        return () => clearInterval(interval);
    }, [props]);

    return(
        <div ref={ref}className="card">
            <div className="name-profile">
                <img src={props.picture} alt="profile"/>
                <div className="name">{props.displayName}</div>
            </div>
            <ScoreTag>{count}pt</ScoreTag>
        </div>
    )
})

export default Card