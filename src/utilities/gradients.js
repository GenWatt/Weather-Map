export const addGradient = (temp) => {
    const tempNumber = Number(temp);
    if (tempNumber >= 15) return "hot-gradient";
    else if (temp >= 0 && tempNumber < 15) return "cold-gradient";
    else return "very-cold-gradient";
};