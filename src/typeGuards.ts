import type { ITeam } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isIteam(arg: any): arg is ITeam {
  /**
   *   
   iconUrl: string;
   name: string;
   id: string;
   channels: IChannel[];
   */
  return (
    typeof arg === 'object' &&
    typeof arg.iconUrl === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.channels)
  );
}

export function assetIsTypedArray<T>(
  arg: unknown,
  check: (val: any) => val is T,
): asserts arg is T[] {
  if (!Array.isArray(arg)) {
    throw new Error(`Not an error: ${JSON.stringify(arg)}`);
  }
  const errorItemIndex = arg.findIndex((item) => !check(item));
  if (errorItemIndex > -1) {
    throw new Error(
      `Violators found: index=${errorItemIndex}, data=${JSON.stringify(
        arg,
      )}`,
    );
  }
}

export function assetIsTyped<T>(
  arg: unknown,
  check: (val: any) => val is T,
): asserts arg is T {
  if (!check(arg)) {
    throw new Error(`Violators found: data=${JSON.stringify(arg)}`);
  }
}
