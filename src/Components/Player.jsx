import React from 'react'
import { useState } from 'react'

const Player = ({initalName , symbol , isActive,onChangeName}) => {

    const [playerName ,setPlayerName] = useState(initalName)
   const [isEditing , setIsEditing] = useState(false)


   const handleClick = () =>{
    setIsEditing((editing)=>!editing);
    if(isEditing){
      onChangeName(symbol , playerName);
    }
   }

   const handleChange = (event)=>{
    setPlayerName(event.target.value)
   }

   let editablePlName = <span className="player-name">{playerName}</span>

   if(isEditing){
    editablePlName = (
     <input type='text' defaultValue={playerName} onChange={handleChange} required/>
    )
   }
  return (
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
    {editablePlName}
  <span className="player-symbol">{symbol}</span>
  </span>
  <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
  </li>
  )
}

export default Player
