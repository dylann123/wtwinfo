class Event {
    constructor(start, end, starttime, endtime, summary, location, category) {
        this.start = start;
        this.end = end;
        this.starttime = starttime;
        this.endtime = endtime;
        this.summary = summary;
        this.location = location;
        this.category = category;

        let startTimeParsed = new Date()
        startTimeParsed.setFullYear(parseInt(start.substring(0, 4)))
        startTimeParsed.setMonth(parseInt(start.substring(4, 6)))
        startTimeParsed.setDate(parseInt(start.substring(6, 8)))
        try{
            startTimeParsed.setHours(parseInt(starttime.substring(0,2)) - 4)
            startTimeParsed.setMinutes(parseInt(starttime.substring(2,4)))
        }catch(e){}
                
        let endTimeParsed = new Date()
        endTimeParsed.setFullYear(parseInt(end.substring(0, 4)))
        endTimeParsed.setMonth(parseInt(end.substring(4, 6)))
        endTimeParsed.setDate(parseInt(end.substring(6, 8)))
        try{
            endTimeParsed.setHours(parseInt(endtime.substring(0,2)) - 4)
            endTimeParsed.setMinutes(parseInt(endtime.substring(2,4)))
        }catch(e){}
        this.start = new CustomDate(startTimeParsed.getFullYear(),startTimeParsed.getMonth(), startTimeParsed.getDate())
        this.end = new CustomDate(endTimeParsed.getFullYear(), endTimeParsed.getMonth(), endTimeParsed.getDate())

        try{
            this.starttime = (isNaN(starttime) || starttime != null) ? new CustomTime(startTimeParsed.getHours(),startTimeParsed.getMinutes()) : null
        
            this.endtime = (isNaN(endtime) || endtime != null) ? new CustomTime(endTimeParsed.getHours(),endTimeParsed.getMinutes()) : null
        }catch(e){
            alert(e)
        }
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    getStartTime() {
        return this.starttime;
    }

    getEndTime() {
        return this.endtime;
    }

    getSummary() {
        return this.summary;
    }

    getLocation() {
        return this.location;
    }

    getCategory() {
        return this.category;
    }

    toString() {
        return `start: ${this.start}\nend: ${this.end}\nstarttime: ${this.starttime}\nendtime: ${this.endtime}\nsummary: ${this.summary}\nlocation: ${this.location}\ncategory: ${this.category}`
    }

}