export const filters = {
    sleep: ["morning", "night", "both/neither"],
    school: ["Weinberg", "McCormick", "School of Communication", "Medill", "Bienen", "SESP"],
    personality: ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESJA", "ISTP", "ISFP", "ESTP", "ESFP"],
    region: ["West", "Midwest", "South", "Mid-Atlantic", "Northeast"],
    other: ["Questbridge/FGLI/DACA", "International", "none"],
    campus: ["north", "south", "none"],
    dorm: ["Elder", "Lincoln", "Kemper", "Sheridan", "Bobb", "McCulloch", "Sargent", "Lindgren", "GREEN House", "Goodrich", "Ayers", "Slivka", "Sheridan", "Allison", "Jones", "1838 Chicago", "Shepard", "Rogers", "East Fairchild", "West Fairchild", "Hobart", "Foster-Walker", "Emerson", "Orrington", "Willard", "Chapin", "North Mid-Quads", "South Mid-Quads"],
    // cleanliness: [...Array(6).keys()],
    // partying: [...Array(6).keys()],
}

// combine filters into one array 
export const filterArr = [].concat.apply([], Object.values(filters));