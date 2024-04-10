function solve(input) {
    const riders = [];
    const ridersCount = input.shift();

    for (let i = 0; i < ridersCount; i++) {
        const [name, fuelCapacity, position] = input.shift().split('|');
        riders.push({ name, fuelCapacity: Number(fuelCapacity), position: Number(position) });
    }

    while (input != 'Finish') {
        const tokens = input.shift().split(' - ');
        let action = tokens[0];
        let rider = getRider(tokens[1]);

        if (action === 'Finish') {
            break;
        }

        if (action === 'StopForFuel') {
            const minimumFuel = tokens[2];
            const changedPosition = tokens[3];

            if (rider.fuelCapacity < minimumFuel) {
                rider.fuelCapacity = 100
                console.log(`${rider.name} stopped to refuel but lost his position, now he is ${changedPosition}.`);
                rider.position = changedPosition;
            }
            else {
                console.log(`${rider.name} does not need to stop for fuel!`);
            }
        }
        else if (action === 'Overtaking') {
            const rider2 = getRider(tokens[2]);
            if (rider.position < rider2.position) {
                [rider.position, rider2.position] = [rider2.position, rider.position]
                /*  const tempPosition = rider.position;
                 rider.position = rider2.position;
                 rider2.position = tempPosition; */
                console.log(`${rider.name} overtook ${rider2.name}!`);
            }
        }
        else if (action === 'EngineFail') {
            const lapsLeft = tokens[2];
            rider.position = 0;
            console.log(`${rider.name} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
        }

    }
    for (const rider of riders) {
        if (rider.position > 0) {
            console.log(rider.name);
            console.log(` Final position: ${rider.position}`);
        }
    }


    function getRider(riderName) {
        return riders.find(x => x.name === riderName)
    }
}
solve((["3",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|2",
    "Jorge Lorenzo|80|3",
    "StopForFuel - Valentino Rossi - 50 - 1",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"]))
solve((["4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"]))