import { describe, expect, test } from "vitest";
import { releaseImages } from "../scripts/release-images.js";

const manifest = {
  version: "v1.0.3",
  commit: "a".repeat(40),
  platforms: ["linux/amd64", "linux/arm64"],
  images: {
    api: `ghcr.io/avgeek-oss/vitalog-api@sha256:${"b".repeat(64)}`,
    web: `ghcr.io/avgeek-oss/vitalog-web@sha256:${"c".repeat(64)}`,
  },
};

describe("release image promotion contract", () => {
  test.each(["avgeek-oss", "praveen-thirumurugan"])(
    "accepts immutable releases published under %s",
    (owner) => {
      const candidate = {
        ...manifest,
        images: {
          api: manifest.images.api.replace("avgeek-oss", owner),
          web: manifest.images.web.replace("avgeek-oss", owner),
        },
      };
      expect(releaseImages.parse(candidate)).toEqual(candidate);
    },
  );
  test("rejects images from an unrelated registry owner", () => {
    expect(
      releaseImages.safeParse({
        ...manifest,
        images: {
          ...manifest.images,
          api: manifest.images.api.replace("avgeek-oss", "another-owner"),
        },
      }).success,
    ).toBe(false);
  });
  test.each([
    { ...manifest, version: "latest" },
    { ...manifest, version: "v01.0.3" },
    { ...manifest, commit: "main" },
    { ...manifest, platforms: ["linux/arm64"] },
    {
      ...manifest,
      images: {
        ...manifest.images,
        api: "ghcr.io/avgeek-oss/vitalog-api:v1.0.3",
      },
    },
    { ...manifest, images: { ...manifest.images, api: manifest.images.web } },
    { ...manifest, images: { api: manifest.images.api } },
    {
      ...manifest,
      images: { ...manifest.images, worker: manifest.images.api },
    },
  ])("rejects incomplete or mutable release metadata %#", (candidate) => {
    expect(releaseImages.safeParse(candidate).success).toBe(false);
  });
});
