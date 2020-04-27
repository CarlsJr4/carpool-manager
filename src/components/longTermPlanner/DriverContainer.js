import React from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';
import IconButton from '../reusable/IconButton';

const DriverContainer = ({passengerList, driverList, handleDelete}) => {
	return (
		<div className="planner__left">
			<div className="drivers__header">
				<h3>Manage Drivers</h3>
				<IconButton
					icon="link"	
				/>
				<IconButton 
					icon="plus"
				/>
			</div>
			<DriverStatusBar 
				passengerList={passengerList}
				driverList={driverList}
			/>
			<div className="drivers__container">
				{driverList.map((driver, i) => 
					<DriverCard
						key={driver.id}
						id={driver.id}
						driverIndex={i}
						name={driver.name}
						passengers={driver.passengers}
						totalSeats={driver.seats}
						handleDelete={handleDelete}
					/>
				)}
			</div>
	</div>
	);
}

export default DriverContainer;
