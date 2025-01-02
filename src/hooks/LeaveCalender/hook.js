export const formatLeaveCalanderData = (data = []) => {

    return data
        .filter((item) => ["approved", "pending"].includes(item.status))
        .map((item) => {
            let arr = [];

            if (item.dateType == "range") {
                arr.push({
                    title: item?.teamMemberId?.name,
                    start: item.dates[0],
                    end: item.dates[item.dates.length - 1],

                    data: {
                        id: item.id,
                        other: item
                    },
                    backgroundColor: item.status == "approved" ? "var(--green-color)" : "var(--orange-color)",
                })
            } else {

                item.dates.map((date) => {
                    arr.push({
                        id: date,
                        title: item?.teamMemberId?.name,

                        start: date,
    
                        data: {
                            id: item.id,
                            other: item
                        },
                        backgroundColor: item.status == "approved" ? "var(--green-color)" : "var(--orange-color)",
                    })
                })

            }

            return arr;
        }).reduce((total, item) => total.concat(item), []);

}
