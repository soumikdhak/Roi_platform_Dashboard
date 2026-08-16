export const getMaxDateString = () => {
    const date = new Date().toISOString().split("T")[0] as string;

    const dateSplit = date.split("-");
    
    const newDate = `${Number(dateSplit[0]) + 5 }-${dateSplit[1]}-${dateSplit[2]}`

    return newDate
};

