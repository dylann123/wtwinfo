class CustomDate{
    constructor(year,month,day){
        this.day = day
        this.month = month
        this.year = year
    }

    getDay(){
        return this.day
    }

    getMonth(){
        return this.month
    }

    getYear(){
        return this.year
    }


    toString(){
        return `${this.month}/${this.day}/${this.year}`
    }
}