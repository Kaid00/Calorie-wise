import { genPassword } from "../lib/services/password_generator/lambda/utils/gen_pwrd";

describe('genPassword function', () => {
    test('should generate password of default length (12) with default options', () => {
      const result = genPassword();
      expect(result.length).toBe(12); // Check if the length is 12 characters
      expect(/[0-9]/.test(result)).toBeTruthy(); // Check if it contains at least one number
      expect(/[!_@&#%$*+]/.test(result)).toBeTruthy(); // Check if it contains at least one special character
      expect(/[A-Z]/.test(result)).toBeTruthy(); // Check if it contains at least one uppercase letter
    });
  
    test('should generate password with only lowercase letters', () => {
      const result = genPassword(false, false, 10, false);
      expect(result.length).toBe(10); // Check if the length is 10 characters
      expect(/^[a-z]+$/.test(result)).toBeTruthy(); // Check if it contains only lowercase letters
    });
  
    test('should generate password without special characters', () => {
      const result = genPassword(true, false, 8, true);
      expect(result.length).toBe(8); // Check if the length is 8 characters
      expect(/^[A-Za-z0-9]+$/.test(result)).toBeTruthy(); // Check if it contains only alphanumeric characters
    });
  
    test('should generate password without numbers', () => {
      const result = genPassword(false, true, 14, true);
      expect(result.length).toBe(14); // Check if the length is 14 characters
      expect(/^[A-Za-z!_@&#%$*+]+$/.test(result)).toBeTruthy(); // Check if it contains only letters and special characters
    });
  
    test('should generate password without uppercase letters', () => {
      const result = genPassword(true, true, 16, false);
      expect(result.length).toBe(16); // Check if the length is 16 characters
      expect(/^[a-z0-9!_@&#%$*+]+$/.test(result)).toBeTruthy(); // Check if it contains only lowercase letters, numbers, and special characters
    });
  });