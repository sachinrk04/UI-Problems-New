import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sleep = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const generateArray = (size: number): number[] =>
    Array.from({length: size}, () => Math.floor(Math.random() * 200) + 10);

export const sequentialArray = (size: number): number[] => Array.from({length: size}, (_, i) => i + 1);
