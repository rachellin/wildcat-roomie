export const filters = {
    identity: ["female-identifying", "male-identifying", "neither female nor male"],
    sleep: ["early bird", "night owl"],
    school: ["Weinberg", "McCormick", "School of Communication", "Medill", "Bienen", "SESP"],
    mbti: ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESJA", "ISTP", "ISFP", "ESTP", "ESFP"],
    region: ["West", "Midwest", "South", "Mid-Atlantic", "Northeast"],
    campus: ["north campus", "south campus", "no campus perference"], // neither = no campus pref?
    dorm: ["Elder", "Lincoln", "Kemper", "Sheridan", "Bobb", "McCulloch", "Sargent", "Lindgren", "GREEN House", "Goodrich", "Ayers", "Slivka", "Allison", "Jones", "1838 Chicago", "Shepard", "Rogers", "East Fairchild", "West Fairchild", "Hobart", "Foster-Walker", "Emerson", "Orrington", "Willard", "Chapin", "North Mid-Quads", "South Mid-Quads"],
    other: ["Questbridge/FGLI/etc", "International", "planning to rush"],
    // cleanliness: [...Array(6).keys()],
    // partying: [...Array(6).keys()],
}

// combine filters into one array 
export const filterArr = [].concat.apply([], Object.values(filters));