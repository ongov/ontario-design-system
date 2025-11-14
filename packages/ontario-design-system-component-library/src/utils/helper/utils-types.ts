import { DeviceTypes } from '../common/common.enum';

// Create a Union Type from Enum Values
export type DeviceType = `${DeviceTypes}`;

export const conjunctions = ['and', 'or'] as const;
export type Conjunction = (typeof conjunctions)[number];
