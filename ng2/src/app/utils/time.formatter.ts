export function stringToMinutes(time: string) {
    let totalTime: number = 0;

    if (time) {
        const timeData: String[] = time.split(/(\s+)/).filter((element) => element.trim().length > 0);

        for (let time of timeData) {
            const value = Number(time.slice(0, time.length - 1));
            const unit = time.slice(time.length - 1);

            // Defaulting day to 8 hours
            if (unit.toLowerCase() === 'd') {
                totalTime += (value * 8 * 60);
            } else if (unit.toLowerCase() === 'h') {
                totalTime += (value * 60);
            } else if (unit.toLowerCase() === 'm') {
                totalTime += value;
            }
        }
    }

    return String(totalTime);
}

export function minutesToString(totalTime: number) {
    let totalMinutes = Number(totalTime);
    let noDays: number = 0;
    let noHours: number = 0;
    let noMinutes: number = 0;

    let time: string = '';

    // 1d = 8 hours = 480 minutes
    while (totalMinutes >= 480) {
        noDays++;
        totalMinutes -= 480;
    }

    while (totalMinutes >= 60) {
        noHours++;
        totalMinutes -= 60;
    }

    noMinutes = totalMinutes;

    if (noDays > 0) {
        time += `${noDays}d `;
    }

    if (noHours > 0) {
        time += `${noHours}h `;
    }

    if (noMinutes > 0) {
        time += `${noMinutes}m`;
    }

    return time;
}
