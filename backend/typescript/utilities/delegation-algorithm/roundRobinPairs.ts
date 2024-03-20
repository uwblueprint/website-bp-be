import { isEqual } from 'lodash';

import Application from '../../models/application.model';
import User from '../../models/user.model';


// Generate a list of all unique pairs of users — from a given list of users
// Uses Round Robin algorithm for optimized time complexity
export function roundRobinPairs(developers: (User | {})[]): [User, User][] {
  if (developers.length % 2 !== 0) {
    developers.push({});
  }

  const fixedDeveloper = developers[0];
  let rotatingDevelopers = developers.slice(1);
  const pairs: [(User | {}), (User | {})][] = [];

  for (let i = 0; i < developers.length - 1; i++) {
    for (let j = 0; j < developers.length / 2 - 1; j++) {
      if (!isEqual(rotatingDevelopers[j], {}) && !isEqual(rotatingDevelopers[developers.length - j - 2], {})) {
        pairs.push([rotatingDevelopers[j], rotatingDevelopers[developers.length - j - 2]]);
      }
    }
    if (!isEqual(fixedDeveloper, {}) && !isEqual(rotatingDevelopers[Math.floor(developers.length / 2) - 1], {})) {
      pairs.push([fixedDeveloper, rotatingDevelopers[Math.floor(developers.length / 2) - 1]]);
    }
    rotatingDevelopers = rotatingDevelopers.slice(1).concat(rotatingDevelopers.slice(0, 1));  //rotate list
  }

  shuffleArray(pairs);
  return pairs as [User, User][];
}

// Multiply pairs to equal the number of applications
export function assignApplicationsToPairs(pairs: [User, User][], applications: Application[]): [User, User][] {
  const totalPairsNeeded = applications.length;
  while (pairs.length < totalPairsNeeded) {
    pairs.push(...pairs.slice(0, totalPairsNeeded - pairs.length));
  }

  shuffleArray(pairs);
  return pairs;
}

// Shuffle a list of items
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
