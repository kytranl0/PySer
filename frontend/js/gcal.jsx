import request from 'superagent'


const CALENDAR_ID = 'm0f5dsrcg5rgi3486aq1l5nl1s@group.calendar.google.com';
const API_KEY= 'AIzaSyCCGWGsj51auj23Lek6RWTRNzKdmTHnigA';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;


export function getEvents (callback) {
    request
        .get(url)
        .end((err, resp) => {
            if (!err) {
                const events = [];
                JSON.parse(resp.text).items.forEach((event) => {
                    let s = event.start.dateTime.split('T');
                    let cleanStart = s[1].slice(0,5);
                    let e = event.end.dateTime.split('T');
                    let cleanEnd = e[1].slice(0,5);
                    events.push({
                        created: event.created.split('T').slice(0,1),
                        startTime: cleanStart,
                        startDate: s[0],
                        endTime: cleanEnd,
                        title: event.summary,
                    })
                });

                function getTitle(events) {
                    let title = new Set();
                    events.forEach(function(child) {
                        title.add(child.startDate)
                    });
                    return title;
                }

                function organizeArray(title, event) {
                    let data = {};
                    title.forEach(function (title) {
                        let childrens = {};
                        event.forEach(function (obj) {
                            if (obj.startDate === title) {
                                childrens[obj.title] = [obj.startTime, obj.endTime];
                            }
                        });
                        data[title] = childrens;
                    });
                    return data;
                }

                let title = getTitle(events);
                let data = organizeArray(Array.from(title), events);
                callback(data)
            }
        })
}


