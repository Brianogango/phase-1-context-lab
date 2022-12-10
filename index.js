/* Your Code Here */
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
//          createEmployeeRecords
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}
//          createTimeInEvent
function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
}
//          createTimeOutEvent
function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
}
//          hoursWorkedOnDate
function hoursWorkedOnDate(employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.find(timeIn => timeIn.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(timeOut => timeOut.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}
//          wagesEarnedOnDate
function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}
//          allWagesFor
function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map(timeIn => timeIn.date)
    let wages = dates.map(date => wagesEarnedOnDate(employeeRecord, date))
    return wages.reduce((total, wage) => total + wage)
}
//          findEmployeeByFirstName
function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0)
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

