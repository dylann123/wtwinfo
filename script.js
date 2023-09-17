async function getSchedule() {
    return new Promise((resolve, reject) => {
        let schedule = "https://raw.githubusercontent.com/dylann123/file-dump/main/schedule.json"

        fetch(schedule)
            .then((data) => { return data.json() })
            .then((res) => {

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

async function getICal() {
    return new Promise((resolve, reject) => {
        let calendar = "https://raw.githubusercontent.com/dylann123/file-dump/main/calendar.ics"

        fetch(calendar)
            .then(data => data.text() )
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function parseICal(ical) {
    let events = ical.split("BEGIN:VEVENT")
    events.shift()
    let output = []

    for (let evt of events) {


        let start = evt.split("DTSTART")[1].split("\n")[0].split(":")[1]

        let starttime = (evt.split("DTSTART")[1].split("\n")[0].split(":")[1].includes("T"))
            ? evt.split("DTSTART")[1].split("\n")[0].split(":")[1].split("T")[1].split("Z")[0] : null


        let end = evt.split("DTEND")[1].split("\n")[0].split(":")[1]

        let endtime = (evt.split("DTEND")[1].split("\n")[0].split(":")[1].includes("T"))
            ? evt.split("DTEND")[1].split("\n")[0].split(":")[1].split("T")[1].split("Z")[0] : null

        let summary = evt.split("SUMMARY:")[1].split("\n")[0]

        let location = (evt.split("LOCATION")[1] != undefined)
            ? evt.split("LOCATION")[1].split("\n")[0].split(":")[1] : null

        let category = (evt.split("CATEGORIES")[1] != undefined)
            ? evt.split("CATEGORIES")[1].split("\n")[0].split(":")[1] : null

        let event = new Event(start, end, starttime, endtime, summary, location, category)
        output.push(event)
    }

    return output
}

function createDay(dayObject) {
    let container = document.createElement("div")
    container.className = "right-container-object"
    container.innerHTML = `<b>${dayObject.getDayOfWeek()}, ${dayObject.getMonthName()} ${dayObject.getDay()}</b><br>`
    container.innerHTML += `${dayObject.getDayType().charAt(0).toUpperCase() + dayObject.getDayType().substring(1)}<br>`

    switch(dayObject.getDayType()){
        case "odd":
            container.className += " odd"
            break
        case "even":
            container.className += " even"
            break
        default:
            container.className += " none"
            break
    }

    container.addEventListener("click", () => {
        clearEventsInDOM()
        loadEventsToDOM(dayObject)
    })

    return container
}

async function guiSetup(today) {
    function updateTime() {
        let time = new Date()
        let hours = time.getHours()
        let minutes = time.getMinutes()

        let ampm = (hours >= 12) ? "PM" : "AM"
        hours = (hours > 12) ? hours - 12 : hours

        if (minutes < 10) {
            minutes = "0" + minutes
        }

        document.getElementById("time").innerHTML = `${hours}:${minutes} ${ampm}`
    }

    let timeInterval = setInterval(updateTime, 1000)
    updateTime()

    let date = new Date()
    let dateParsed = new Day(date.getDate(), date.getMonth() + 1)
    let dayOfWeek = dateParsed.getDayOfWeek()
    let month = dateParsed.getMonthName()
    console.log(dateParsed);
    let day = dateParsed.getDay()

    document.getElementById("date").innerHTML = `${dayOfWeek}, ${month} ${day}`;

    let dayType = today.getDayType()
    document.getElementById("day-type").innerHTML = dayType

    const schedule = await getSchedule()

    

    let returns = today.getReturns()
    document.getElementById("returns").innerHTML = "Returns: " + returns
}

function loadEventsToDOM(day){
    const leftContainerBottom = document.getElementById("left-container-bottom")
    for(let event of day.getEvents()){
        let element = document.createElement("div")
        element.className = "left-container-object"
        element.innerHTML = "<b>"+event.getSummary()+"</b><br>"
        element.innerHTML += "Location: "+event.getLocation()+"<br>"
        element.innerHTML += "Time: "+event.getStartTime()+" - "+event.getEndTime()+"<br>"
        element.innerHTML += "Category: "+event.getCategory()

        document.getElementById("left-container-bottom").appendChild(element)
    }
    try{
    document.getElementById("left-container-bottom-title").innerText = `${day.getDayOfWeek()}, ${day.getMonthName()} ${day.getDay()}`
    }catch(e){alert(e.stack)}
}

function clearEventsInDOM(){
    document.getElementById("left-container-bottom").innerHTML = `<legend id="left-container-bottom-title"></legend>`
}

(async () => {
    const ical = await getICal()

    const events = parseICal(ical)

    function getEvents(day, month) {
        let evts = []
        for (let i of events) {
            if ((day == i.getStart().getDay()) && (month == i.getStart().getMonth())) {
                evts.push(i)
            }
        }
        return evts
    }

    const today = new Date()

    const LOAD_DAYS = 31
    let days = []
    for (let i = 0; i < LOAD_DAYS; i++) {
        const newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
        const day = (newDate.getDate() >= 10) ? newDate.getDate().toString() : "0" + newDate.getDate()
        const month = (newDate.getMonth() + 1 >= 10) ? (newDate.getMonth() + 1).toString() : "0" + (newDate.getMonth() + 1)
        let temp = new Day(day, month)
        for (let event of getEvents(day, month)) {
            temp.addEvent(event)
        }
        days.push(temp)
    }

    const container = document.getElementById("right-container")
    for (let i of days) {
        container.appendChild(createDay(i))
    }

    guiSetup(days[0])
    loadEventsToDOM(days[0])
})()
