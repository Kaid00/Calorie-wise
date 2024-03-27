import { calculateDailyCalorieRequirement } from "../lib/services/calorie_calculator/lambda/utils/cal_cal_req";

describe('calculateDailyCalorieRequirement function', () => {
  test('should calculate daily calorie requirement for a male with sedentary activity level', () => {
    const result = calculateDailyCalorieRequirement(30, 180, 75, 'male', 1);
    expect(result).toEqual({
        goals: {
            maintenance: '2144',
            mildWeightLoss: '1822',
            weightLoss: '1715',
            extremeWeightLoss: '1501',
            mildWeightGain: '2466',
            weightGain: '2573',
            extremeWeightGain: '2787'
          },
          weeklyWeightChange: {
            mildWeightLoss: '0.52',
            weightLoss: '0.49',
            extremeWeightLoss: '0.43',
            mildWeightGain: '0.70',
            weightGain: '0.74',
            extremeWeightGain: '0.80'
            }
    });
  });

  test('should calculate daily calorie requirement for a female with moderately active activity level', () => {
    const result = calculateDailyCalorieRequirement(25, 160, 60, 'female', 3);
    console.log(result)
    expect(result).toEqual({
        goals: {
            maintenance: '2154',
            mildWeightLoss: '1831',
            weightLoss: '1723',
            extremeWeightLoss: '1508',
            mildWeightGain: '2477',
            weightGain: '2585',
            extremeWeightGain: '2801'
          },
          weeklyWeightChange: {
            mildWeightLoss: '0.52',
            weightLoss: '0.49',
            extremeWeightLoss: '0.43',
            mildWeightGain: '0.71',
            weightGain: '0.74',
            extremeWeightGain: '0.80'
          }
    });
  });

  test('should return error message for invalid gender input', () => {
    const result = calculateDailyCalorieRequirement(30, 170, 70, 'unknown', 2);
    expect(result).toBe("Invalid gender. Please provide 'male' or 'female'.");
  });

  test('should handle weight in pounds correctly', () => {
    const result = calculateDailyCalorieRequirement(35, 165, 150, 'male', 4, 'lbs');
    console.log(result)
    expect(result).toEqual({
        goals: {
            maintenance: '2748',
            mildWeightLoss: '2336',
            weightLoss: '2198',
            extremeWeightLoss: '1924',
            mildWeightGain: '3160',
            weightGain: '3298',
            extremeWeightGain: '3572'
          },
          weeklyWeightChange: {
            mildWeightLoss: '0.67',
            weightLoss: '0.63',
            extremeWeightLoss: '0.55',
            mildWeightGain: '0.90',
            weightGain: '0.94',
            extremeWeightGain: '1.02'
          }
    });
  });
});
