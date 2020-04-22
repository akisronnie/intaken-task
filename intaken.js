const intakes = [
    {time: "9:15", pills: 1},
    {time: "15:35", pills: 2},
    {time: "19:00", pills: 1},
  ];

const stock = 40;
const frequency = "weekly"; //possible values - "daily", "eachOtherDay" (через день), "weekly";
const weekDays = {
  monday: true,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: true,
  saturday: false,
  sunday: false,
}; // this  parameter is REQUIRED ONLY for "weekly" frequency of intakes 


function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
    const weekDaysMap = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'sunday'
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
            stock -= element.pills;
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