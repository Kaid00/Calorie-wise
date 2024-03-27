// export function calculateDailyCalorieRequirement(age: number, height: number, weight: number, gender: string, activityLevel: number, weightUnit: string = 'kg') {
//     // Harris-Benedict Equation
//     // For men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
//     // For women: BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)

//     let actualWeight = weight
//     if (weightUnit == 'lbs') {
//         actualWeight = weight * 0.453592
//     }
//     let bmr;
    
//     if (gender.toLowerCase() === 'male') {
//         bmr = 88.362 + (13.397 * actualWeight) + (4.799 * height) - (5.677 * age);
//     } else if (gender.toLowerCase() === 'female') {
//         bmr = 447.593 + (9.247 * actualWeight) + (3.098 * height) - (4.330 * age);
//     } else {
//         return "Invalid gender. Please provide 'male' or 'female'.";
//     }

//     // activity level
//     const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9, 2.0];
//     const activityFactor = activityFactors[activityLevel - 1];
    
//     const dailyCalorieRequirement = bmr * activityFactor;
    
    
//     // Calorie intake for weight loss and weight gain
//     const mildWeightLoss = dailyCalorieRequirement * 0.85;
//     const weightLoss = dailyCalorieRequirement * 0.8;
//     const extremeWeightLoss = dailyCalorieRequirement * 0.7;
//     const mildWeightGain = dailyCalorieRequirement * 1.15;
//     const weightGain = dailyCalorieRequirement * 1.2;
//     const extremeWeightGain = dailyCalorieRequirement * 1.3;

  
//     return {
//         goals: {
//             maintenance: dailyCalorieRequirement.toFixed(0),
//             mildWeightLoss: mildWeightLoss.toFixed(0),
//             weightLoss: weightLoss.toFixed(0),
//             extremeWeightLoss: extremeWeightLoss.toFixed(0),
//             mildWeightGain: mildWeightGain.toFixed(0),
//             weightGain: weightGain.toFixed(0),
//             extremeWeightGain: extremeWeightGain.toFixed(0)
//         }
//     };
// }

export function calculateDailyCalorieRequirement(age: number, height: number, weight: number, gender: string, activityLevel: number, weightUnit: string = 'kg') {
    // Harris-Benedict Equation
    // For men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
    // For women: BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)

    let actualWeight = weight;
    if (weightUnit == 'lbs') {
        actualWeight = weight * 0.453592; // Convert weight to kg if it's in lbs
    }
    let bmr;
    
    if (gender.toLowerCase() === 'male') {
        bmr = 88.362 + (13.397 * actualWeight) + (4.799 * height) - (5.677 * age);
    } else if (gender.toLowerCase() === 'female') {
        bmr = 447.593 + (9.247 * actualWeight) + (3.098 * height) - (4.330 * age);
    } else {
        return "Invalid gender. Please provide 'male' or 'female'.";
    }

    // Activity level factors with sentence descriptions
    const activityFactors = [
        {factor: 1.2, description: "Sedentary (little to no exercise)"},
        {factor: 1.375, description: "Lightly active (light exercise/sports 1-3 days a week)"},
        {factor: 1.55, description: "Moderately active (moderate exercise/sports 3-5 days a week)"},
        {factor: 1.725, description: "Very active (hard exercise/sports 6-7 days a week)"},
        {factor: 1.9, description: "Extra active (very hard exercise/sports & physical job or 2x training)"},
        {factor: 2.0, description: "Professional athlete (intense training multiple times per day)"}
    ];
    const activityFactor = activityFactors[activityLevel - 1].factor;
    
    // Calculate daily calorie requirement
    const dailyCalorieRequirement = bmr * activityFactor;
    
    // Calorie intake for different goals
    const mildWeightLoss = dailyCalorieRequirement * 0.85;
    const weightLoss = dailyCalorieRequirement * 0.8;
    const extremeWeightLoss = dailyCalorieRequirement * 0.7;
    const mildWeightGain = dailyCalorieRequirement * 1.15;
    const weightGain = dailyCalorieRequirement * 1.2;
    const extremeWeightGain = dailyCalorieRequirement * 1.3;

    // Weekly weight loss/gain (assuming 1 pound ~ 3500 calories)
    const weeklyWeightLoss = {
        mildWeightLoss: (mildWeightLoss / 3500).toFixed(2),
        weightLoss: (weightLoss / 3500).toFixed(2),
        extremeWeightLoss: (extremeWeightLoss / 3500).toFixed(2),
        mildWeightGain: (mildWeightGain / 3500).toFixed(2),
        weightGain: (weightGain / 3500).toFixed(2),
        extremeWeightGain: (extremeWeightGain / 3500).toFixed(2)
    };

    // Return the calculated values including activity description and weekly weight loss/gain
    return {
        goals: {
            maintenance: dailyCalorieRequirement.toFixed(0),
            mildWeightLoss: mildWeightLoss.toFixed(0),
            weightLoss: weightLoss.toFixed(0),
            extremeWeightLoss: extremeWeightLoss.toFixed(0),
            mildWeightGain: mildWeightGain.toFixed(0),
            weightGain: weightGain.toFixed(0),
            extremeWeightGain: extremeWeightGain.toFixed(0)
        },
        weeklyWeightChange: weeklyWeightLoss
    };
}

