import { apiCall } from '../utils/networking';
import type { ITeam } from '../types';
import {
  isIteam,
  assetIsTyped,
  assetIsTypedArray,
} from '../typeGuards';

let cachedAllTeamsList: Promise<ITeam[]>;
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams').then((rawData) => {
      assetIsTypedArray(rawData, isIteam);
      return rawData;
    });

  return await cachedAllTeamsList;
}

const cachedTeamRecords: Record<string, Promise<ITeam>> = {};

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id];
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`).then(
      (rawData) => {
        assetIsTyped<ITeam>(rawData, isIteam);
        return rawData;
      },
    );
  return await cached;
}
