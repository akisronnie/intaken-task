const intakes = [{"time":"09:22","pills":4},{"time":"23:04","pills":4}];

const stock = 58;
const frequency = "weekly"; //possible values - "daily", "eachOtherDay" (через день), "weekly";
const weekDays = {"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"saturday":false,"sunday":true}; // this  parameter is REQUIRED ONLY for "weekly" frequency of intakes 


function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
    const weekDaysMap = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday'
    }

    const date = new Date();
    let currentDay = date.getDay();
    let days = 0;
    let lastTime;
    let isToday = true;

    function switchNextDay() {
        days++;
        currentDay = currentDay + 1 > 6 ? 0 : currentDay + 1; 
        isToday = false;
    }

    function compareTimes(intakesTime, date) {
        const intakesTimeArray = intakesTime.split(':');
        const compareTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), intakesTimeArray[0], intakesTimeArray[1]) 

        return date.getTime() > compareTime.getTime();
    }

    while (stock > 0) {
        if (!weekDays[weekDaysMap[currentDay]] && frequency === 'weekly') {
            switchNextDay();
            continue;
        }

        intakes.forEach(element => {
            if (stock < 1 || (isToday && compareTimes(element.time, date))) {
                return;
            }

            lastTime = element.time;
            stock = stock - element.pills;
        });

        if (stock > 0) {
            switchNextDay();
            
            if (frequency === 'eachOtherDay') {
                switchNextDay();
            }
        }
    }

    const lastTimeArray = lastTime.split(':');

    return new Date(date.getFullYear(), date.getMonth(), Number(date.getDate()) + days, lastTimeArray[0], lastTimeArray[1]);
   }