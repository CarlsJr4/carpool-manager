import React, { useContext } from 'react';
import DriverContainer from './driverPanel/DriverContainer';
import UnassignedContainer from './passengerPanel/UnassignedContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { CarpoolContext } from '../../context/GlobalState';
import axios from 'axios';
import passengerArray from '../../helpers/passengerArray';
// import IconButton from '../reusable/IconButton';
// import Navbar from '../reusable/Navbar';

// TODO:
// Clean up the code and organization

const Planner = () => {
  const { driverList, updateDriverList } = useContext(CarpoolContext);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    const start = source.droppableId;
    const end = destination && destination.droppableId;

    // Outside drops
    if (!destination) {
      return;
    }

    // Drop in same place
    if (end === start && destination.index === source.index) {
      return;
    }

    // Drop in a different list
    if (start !== end) {
      updateDriverList({
        type: 'TRANSFER',
        source,
        destination,
        draggableId,
      });
      const { sourcePassengers, destPassengers } = passengerArray(
        start,
        end,
        driverList
      );
      axios.put(
        'http://localhost:3000/api/events/5ef538186635ff06cc86258b/drivers/transfer',
        {
          sourcePassengers,
          destPassengers,
          startId: start,
          destId: end,
        }
      );
      return;
    }

    updateDriverList({
      type: 'REORDER_PASSENGERS',
      source,
      destination,
      draggableId,
    });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="longTermPlanner">
        <p>
          Ice Skating With Friends | February 12th, 2020 | 6:00pm{' '}
          {/* <span><IconButton icon="user-edit"/></span> */}
        </p>
        <div className="longTermPlanner__cards">
          <DragDropContext onDragEnd={onDragEnd}>
            <DriverContainer />
            <UnassignedContainer />
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Planner;
