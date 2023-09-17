class Day{
    constructor(day,month){
        this.day = day.toString()
        this.month = month.toString()
        this.events = []

        if(this.day.length == 1){
            this.day = "0" + this.day
        }
        if(this.month.length == 1){
            this.month = "0" + this.month
        }

    }

    getDay(){
        return this.day
    }

    getMonth(){
        return this.month
    }

    getYear(){
        return new Date().getFullYear()
    }

    getMonthName(){
        switch(this.month){
            case "01":
                return "January"
            case "02":
                return "February"
            case "03":
                return "March"
            case "04":
                return "April"
            case "05":
                return "May"
            case "06":
                return "June"
            case "07":
                return "July"
            case "08":
                return "August"
            case "09":
                return "September"
            case "10":
                return "October"
            case "11":
                return "November"
            case "12":
                return "December"
            default:
                return "???"
        }
    }

    getDayType(){
        for(let i of this.events){
            if(i.getCategory().includes("Odd Day")){
                return "odd"
            }
            if(i.getCategory().includes("Even Day")){
                return "even"
            }
        }
        return "?";
    }

    getReturns(){
        if(this.getDayType() == "odd"){
            for(let i of this.events){
                if(i.getCategory().includes("Odd Day")){
                    return i.getSummary().split(" ")[2]
                }
            }
        }else{
            return "none"
        }
    }

    getDayOfWeek(){
        let date = new Date(new Date().getFullYear(),parseInt(this.month)-1,parseInt(this.day))
        // return monday, tuesday, etc.

        switch(date.getDay()){
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                return "???"
        }
    }

    addEvent(evt){
        this.events.push(evt)
    }

    getEvents(){
        return this.events
    }

    toString(){
        let eventsString = "Events: \n"
        for(let i of this.events){
            eventsString += i.toString() + "\n"
        }
        return `Day: ${this.month}/${this.day}\n${eventsString}`
    }
}