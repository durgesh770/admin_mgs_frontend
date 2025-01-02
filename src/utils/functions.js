const moment = require('moment');
import { useSearchParams } from "next/navigation";
import { convertStringTimeToNumber } from "./tools";

export const formatAppointmentCount = (count) => {
    if (count >= 1000) {
        return new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(count);
    } else {
        return count?.toString();
    }
};

export const DefaultSelected = (data) => {
    return data.reduce((result, current, index) => {
        if (current.status == "pending") {
            result[index] = '1';
        } else {
            result[index] = '2';
        }
        return result;
    }, {});
}

export const TotalTip = (arr) => {
    let tipSum = arr?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);

    return tipSum
}

export const CalculateDuration = (startTime, endTime) => {
    // Convert start and end times to minutes
    const startHour = Math.floor(startTime / 100);
    const startMinute = startTime % 100;
    const endHour = Math.floor(endTime / 100);
    const endMinute = endTime % 100;

    // Calculate total minutes for start and end times
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Calculate the duration
    let duration;
    if (endTotalMinutes < startTotalMinutes) {
        // If end time is earlier than start time, it crosses midnight
        duration = (24 * 60 - startTotalMinutes) + endTotalMinutes;
    } else {
        // If end time is after start time, calculate duration normally
        duration = endTotalMinutes - startTotalMinutes;
    }

    return isNaN(duration) ? 0 : duration;
}

export const getExistingTab = () => {
    const params = useSearchParams();
    const existingTab = params.get("tab");

    return parseInt(existingTab || "0")
}

export const ComposeChartFormateData = (inputData, type) => {
    const result = [];

    if (type === "monthly") {
        inputData.forEach(x => {
            result.push({
                date: moment(x.date).format('D MMM YYYY'),
                Income: x.totalRevenue,
                Expense: x.totalExpense,
                Profit: (x.totalRevenue - x.totalExpense)
            });
        });
    } else {
        let sum = 0;
        let cnt = 0;

        inputData.forEach((x, index) => {
            sum += x.totalRevenue;
            cnt += x.totalExpense;

            const currentMonth = moment(x.date).format('MMMM');
            const nextMonth = index + 1 < inputData.length ? moment(inputData[index + 1].date).format('MMMM') : null;

            if (currentMonth !== nextMonth || index === inputData.length - 1) {
                result.push({
                    date: currentMonth,
                    Income: sum,
                    Expense: cnt,
                    Profit: (sum - cnt)
                });
                sum = 0;
                cnt = 0;
            }
        });
    }

    return result;
};


export const formateSalesChartData = (inputData, type, nameType) => {
    const result = [];

    if (type === "monthly") {
        Object.keys(inputData).forEach(date => {
            result.push({
                date: moment(date).format('D MMM YYYY'),
                [nameType]: inputData[date]
            });
        });
    } else {
        let sum = 0;

        Object.keys(inputData).forEach(date => {
            sum += inputData[date];
        });

        result.push({
            date: moment(Object.keys(inputData)[0]).format('MMMM'),
            [nameType]: sum
        });
    }

    return result;
}

export const convertDataFormat = (originalData, userId) => {
    const formateData = {
        teamMemberId: userId,
        date: new Date(),
        hours: []
    };

    for (const [teamMemberId, appointments] of Object.entries(originalData)) {
        for (const appointment of appointments) {
            const startTime = convertStringTimeToNumber(moment(appointment.start_time, "HH:mm:ss").format("HH:mm"));
            const endTime = convertStringTimeToNumber(moment(appointment.end_time, "HH:mm:ss").format("HH:mm"));
            const duration = appointment.duration;

            formateData.hours.push({
                startTime,
                endTime,
                workedType: "Appointment",
                reference: teamMemberId,
                duration
            });
        }
    }

    formateData.hours.sort((a, b) => a.startTime - b.startTime);

    return formateData;
};

export const formateDataForPieChart = (data) => {
    let pieChart = [];
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        pieChart.push({ id: i, value: x.count, label: x.service.serviceName });
    }

    return pieChart;
}

export const formateDataForPieChartInAccountPage = (data, type) => {
    let pieChart = [];
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        if (type == 'gross') {
            pieChart.push({ id: i, value: x.total, label: x.serviceName });
        } else if (type == "member") {
            pieChart.push({ id: i, value: x.count, label: x.teamMember.teamMemberName });
        }
    }

    return pieChart;
}

export const getCountAppointmentMonthWise = (appointments) => {
    let ans = [];
    let monthCounts = {}; // Object to store month-wise appointment counts

    // Iterate through appointments
    appointments.forEach((appointment) => {
        // Extract the month name from the appointment's date
        const monthName = moment(appointment.date).format("MMMM");

        // Increment the count for the current month or initialize it to 1 if not present
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });

    // Push the counts for each month to the result array
    Object.values(monthCounts).forEach(count => {
        ans.push(count);
    });

    return ans;
};

export const getCountAppointmentMonth = (appointments) => {
    let uniqueMonths = [];

    // Iterate through appointments
    appointments.forEach((appointment) => {
        // Extract the month name from the appointment's date
        const monthName = moment(appointment.date).format("MMMM");

        // Check if the month name is not already present in uniqueMonths array
        if (!uniqueMonths.includes(monthName)) {
            // If the month name is not present, add it to the uniqueMonths array
            uniqueMonths.push(monthName);
        }
    });

    return uniqueMonths;
};

 export const formatApiResponse = (apiResponse) => {
    const formattedData = [];

    apiResponse.permissions.forEach((permission) => {
      const filteredRoles = permission.permissionId.roles.filter((role) =>
        permission.roles.includes(role.role)
      );

      const formattedPermission = {
        title: permission.permissionId.title,
        icon: permission.permissionId.icon,
        iconColor: permission.permissionId.iconColor,
        roles: filteredRoles.map((filteredRole) => ({
          title: filteredRole.title,
          role: filteredRole.role,
        })).map((per) => per.title),
      };

      formattedData.push(formattedPermission);
    });

    return formattedData;
  };


  export const generateHoursArray =(numHours)=> {
    const hoursArray = [];
  
    for (let i = 0; i <= numHours; i++) {
      hoursArray.push({
        label: `${i} Hours`,
        value: i,
      });
    }
  
    return hoursArray;
  }
  
  export const convertToHoursAndMinutes =(totalMinutes)=> {
    // Calculate hours and remaining minutes
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
  
    // Create and return an object
    return {
      hours: hours.toString(),
      minutes: remainingMinutes.toString(),
    };
  }