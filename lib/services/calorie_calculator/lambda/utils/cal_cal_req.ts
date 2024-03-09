export function calculateDailyCalorieRequirement(age: number, height: number, weight: number, gender: string, activityLevel: number) {
    // Harris-Benedict Equation
    // For men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
    // For women: BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)

    let bmr;
    
    if (gender.toLowerCase() === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender.toLowerCase() === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        return "Invalid gender. Please provide 'male' or 'female'.";
    }

    // activity level
    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9, 2.0];
    const activityFactor = activityFactors[activityLevel - 1];
    
    const dailyCalorieRequirement = bmr * activityFactor;
    
    
    // Calorie intake for weight loss and weight gain
    const mildWeightLoss = dailyCalorieRequirement * 0.85;
    const weightLoss = dailyCalorieRequirement * 0.8;
    const extremeWeightLoss = dailyCalorieRequirement * 0.7;
    const mildWeightGain = dailyCalorieRequirement * 1.15;
    const weightGain = dailyCalorieRequirement * 1.2;
    const extremeWeightGain = dailyCalorieRequirement * 1.3;

    return {
        dailyCalorieRequirement: dailyCalorieRequirement.toFixed(0),
        mildWeightLoss: mildWeightLoss.toFixed(0),
        weightLoss: weightLoss.toFixed(0),
        extremeWeightLoss: extremeWeightLoss.toFixed(0),
        mildWeightGain: mildWeightGain.toFixed(0),
        weightGain: weightGain.toFixed(0),
        extremeWeightGain: extremeWeightGain.toFixed(0)
    };
}


