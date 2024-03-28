const rtgPlanning = (drivers, rtgs , planning) => {
    let nbrDrivers = drivers.length;
    let nbrRtgs = rtgs.length;
    let nbrSubs = nbrDrivers - nbrRtgs;
    let nbrCols = Math.ceil(nbrDrivers / nbrSubs);
    let nbrDoubleBreak = nbrSubs - (nbrDrivers % nbrSubs);
    drivers = drivers.sort(function(a,b){return b.workingHours-a.workingHours});
    for (let i = 0; i < nbrDrivers; i++) {
        planning.push(Array(nbrCols+1).fill(drivers[i].name));
    }
    let k =0;
    for (let i = 0; i < nbrDrivers; i += nbrSubs) {
        k++;
        let maxJ = i + nbrSubs;
        if (maxJ > nbrDrivers) maxJ = maxJ - nbrDoubleBreak;
        for (let j = i; j < maxJ; j++) {
            planning[j][k] = 'P';
        }
    }
    let startDoubleBreak = planning.length-nbrSubs
    for(let j=1;j<nbrCols+1;j++){
        rtgsIndex = 0
        for(let i=0;i<nbrDrivers;i++){
            if(planning[i][j]!='P'){
                planning[i][j]=rtgs[rtgsIndex];
                rtgsIndex++}
        }
    }
    for(let i=startDoubleBreak;i<startDoubleBreak+nbrDoubleBreak;i++){
        planning[i][k] = 'DP'}
    const maxWorkingHoursDrivers = drivers.slice(0,nbrDoubleBreak)
    const maxWorkingHoursDriversNames = maxWorkingHoursDrivers.map(driver=>driver.name)
    const doubleBreakDrivers = []

    for(i=0;i<nbrDrivers;i++){
        if(planning[i][nbrCols]=='DP'){
            doubleBreakDrivers.push({
                index : i,
                driver : planning[i][0]})
        }
    }    
    console.log('double break drivers',doubleBreakDrivers)

    // for(i=0;i<nbrDoubleBreak;i++){
    //     tempDriver = planning[i][0];
    //     planning[i][0] = doubleBreakDrivers[i].driver;
    //     planning[doubleBreakDrivers[i].index][0] = tempDriver
    // }
    // Displaying the planning array as a matrix
    const table = document.getElementById('matrixTable');
    for (let i = 0; i < planning.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < planning[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = planning[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
   
    
}

// Example usage
const drivers = [
{
    name : 'Driver1',
    workingHours : 10
}, {
    name : 'Driver2',
    workingHours : 10
}, {
    name : 'Driver3',
    workingHours : 10
}, {
    name : 'Driver4',
    workingHours : 6
}, {
    name : 'Driver5',
    workingHours : 15
},
{
    name : 'Driver6',
    workingHours : 12
}, {
    name : 'Driver7',
    workingHours : 12
}, {
    name : 'Driver8',
    workingHours : 16
}, {
    name : 'Driver9',
    workingHours : 8
}, {
    name : 'Driver10',
    workingHours : 8
},
{
    name : 'Driver11',
    workingHours : 10
}, {
    name : 'Driver12',
    workingHours : 10
}, {
    name : 'Driver13',
    workingHours : 10
}, {
    name : 'Driver14',
    workingHours : 6
}, {
    name : 'Driver15',
    workingHours : 6
},
{
    name : 'Driver16',
    workingHours : 6
},{
    name : 'Driver17',
    workingHours : 6
},
{
    name : 'Driver18',
    workingHours : 6
},
{
    name : 'Driver19',
    workingHours : 6
}
];
const rtgs = [
    'RTG1', 'RTG2', 'RTG3',
    'RTG4', 'RTG5', 'RTG6',
    'RTG7', 'RTG8', 'RTG9',
    'RTG10', 'RTG11','RTG12',
    'RTG13','RTG14', 'RTG15', 'RTG16'
];
const planning = [];
rtgPlanning(drivers, rtgs,planning);


