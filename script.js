
let calendarHours ={
    "9AM": "",
    "10AM": "",
    "11AM": "",
    "12PM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
    "5PM": "",
};

$(document).ready(function() {
    if(!localStorage.getItem('calendarHours')) {
        updateEventsAdded(calendarHours);
    }
    else {
        updateEventsAdded(JSON.parse(localStorage.getItem('calendarHours')));
    }
})

$('#date-today h5').text(moment().format('dddd')+ ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

let counter = 1;
for(const property in calendarHours) {
    let userInput = "#user-Input" + counter;
    $(userInput).text(calendarHours[property]);
    let slotId = "#slot" + counter;
    let currentHour = moment().hour();
    let timeIdString = $(slotId).text();
    let numberTime = hourInString(timeIdString);
    if(numberTime < currentHour) {
        $(userInput).addClass("past");
    } else if (numberTime > currentHour) {
        $(userInput).addClass("future");
    } else {
        $(userInput).addClass("present");
    }
    counter++;
}

$("button").click(function () {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    saveUpdates(hourString, value);
});

function hourInString(hourString) {
    switch(hourString) {
        case "9AM": return 9;
        case "10AM": return 10;
        case "11AM": return 11;
        case "12PM": return 12;
        case "1PM": return 13;
        case "2PM": return 14;
        case "3PM": return 15;
        case "4PM": return 16;
        case "5PM": return 17;
    }
}

function loadData () {
    result = localStorage.getItem('calendarHours') 
    return (result ? result : calendarHours);
}

function openLocalStorage () {
    localStorage.setItem('calendarHours', JSON.stringify(calendarHours));
};

function saveToLocal (addEv) {
    localStorage.setItem('calendarHours', JSON.stringify(addEv));
}

function saveUpdates (hourString, val) {
    if(!localStorage.getItem('calendarHours')) {
        openLocalStorage();
    }
    let setHours = JSON.parse(localStorage.getItem('calendarHours'));
    setHours[hourString] = val
    saveToLocal(setHours);
}

function updateEventsAdded (addEvents) {
    $(".row").each(function(index) {
        let res = $(this).children("div");
        $(this).children("textarea").text(addEvents[res.text()]);
    })


}
