class CustomTime{
    constructor(hour,minute){
        this.hour = hour
        this.minute = minute
    }

    getHour(){
        if(this.hour <= 9)
            return "0"+this.hour
        return this.hour
    }

    getMinute(){
        if(this.minute <= 9)
            return "0"+this.minute
        return this.minute
    }

    toString(){
        return `${((this.hour > 12) ? this.hour-12 : this.getHour())}:${this.getMinute()} ${(this.hour >= 12) ? "PM" : "AM"}`
    }
}