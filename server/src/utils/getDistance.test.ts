import { describe, expect, it } from "@jest/globals";

import { getDistance } from "./getDistance";

describe("getDistance", () => {
  it("returns 0 for the same point", () => {
    const point = { lng: 2.3522, lat: 48.8566 };

    expect(getDistance(point, point)).toBe(0);
  });

  it("returns the distance between Paris and Lyon in kilometers", () => {
    const paris = { lng: 2.3522, lat: 48.8566 };
    const lyon = { lng: 4.8357, lat: 45.764 };

    const distance = getDistance(paris, lyon);

    expect(distance).toBeGreaterThan(391);
    expect(distance).toBeLessThan(392);
  });
});
