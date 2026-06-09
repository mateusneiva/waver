import { describe, expect, it } from "vitest";
import { joinClasses } from "./join-classes";

describe("joinClasses", () => {
  it("joins only truthy classes", () => {
    expect(joinClasses("btn", undefined, false, "active")).toBe("btn active");
  });
});
