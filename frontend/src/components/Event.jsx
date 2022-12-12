import React from 'react'
import { Card } from 'react-bootstrap'
import "./Building.css"

const Event = ({event, onClick}) => {
  return (
    <Card onClick={e=>onClick(event.id_key)} className="building mt-2 p-2">{event.name}</Card>
  )
}

export default Event
