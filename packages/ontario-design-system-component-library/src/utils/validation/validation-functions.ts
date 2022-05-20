export function validatePropExists(newValue: string): boolean {
  // Check if new value that is passed in is a string and is not empty
  const isNewValueBlank = typeof newValue !== 'string' || newValue === '';

  // Return true if new value is both a string and is not empty
  return isNewValueBlank;
}

export function validateValueAgainstEnum<T>(newValue: string, validTypes: T): boolean {
  // compare the new value against enumList that is provided
  const compareValue = (Object.values(validTypes).find(type => type === newValue.toLowerCase()));

  // Return true if there is a match, otherwise return false
  return compareValue;
}
