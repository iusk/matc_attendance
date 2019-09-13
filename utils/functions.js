// functions that are used in more than one component

import memoize from 'memoize-one';

const convertDate = memoize((dateObject) => {
    return dateObject.getFullYear() + '-' + (dateObject.getMonth()+1).toString().padStart(2, 0) + '-' + dateObject.getDate().toString().padStart(2, 0);
})

const convertTime = memoize((time) => {
    if (time !== '') {
        [hour, minute, _] = time.split(":");
        let suffix = '';
        if (hour >= 12) {
            if (hour !== '12') hour -= 12;
            suffix = 'PM';
        } else {
            suffix = 'AM';
        }
        return hour.toString().padStart(2, 0) + ':' + minute.toString().padStart(2, 0) + ' ' + suffix;
    } else {
        return '';
    }
})

export { convertDate, convertTime }