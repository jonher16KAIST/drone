import React from 'react'
import { Card } from 'react-bootstrap'
import "./Building.css"

const Building = ({building, onClick}) => {
    console.log("Building from Building comp ", building.name, building.id_key)
  return (
    <Card onClick={e=>onClick(building.id_key)} className="building mt-2 p-2">{building.name}</Card>
  )
}

export default Building
