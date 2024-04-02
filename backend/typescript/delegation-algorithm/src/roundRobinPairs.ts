import { isEqual } from "lodash";

import Application from "../../models/application.model";
import User from "../../models/user.model";


// Generate a list of all unique pairs of users — from a given list of users
// Uses Round Robin algorithm for optimized time complexity
export function roundRobinPairs(reviewers: (User | {})[]): [User, User][] {
  if (reviewers.length % 2 !== 0) {
    reviewers.push({});
  }

  const fixedReviewer = reviewers[0];
  let rotatingReviewers = reviewers.slice(1);
  const pairs: [(User | {}), (User | {})][] = [];

  for (let i = 0; i < reviewers.length - 1; i++) {
    for (let j = 0; j < reviewers.length / 2 - 1; j++) {
      if (!isEqual(rotatingReviewers[j], {}) && !isEqual(rotatingReviewers[reviewers.length - j - 2], {})) {
        pairs.push([rotatingReviewers[j], rotatingReviewers[reviewers.length - j - 2]]);
      }
    }
    if (!isEqual(fixedReviewer, {}) && !isEqual(rotatingReviewers[Math.floor(reviewers.length / 2) - 1], {})) {
      pairs.push([fixedReviewer, rotatingReviewers[Math.floor(reviewers.length / 2) - 1]]);
    }
    rotatingReviewers = rotatingReviewers.slice(1).concat(rotatingReviewers.slice(0, 1));  //rotate list
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
