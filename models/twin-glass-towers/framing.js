import { MathUtils } from 'three';

/** Fit the bounding sphere in both vertical and horizontal fields of view. */
export function cameraDistance(radius, fovDegrees, aspect) {
  const vertical = MathUtils.degToRad(fovDegrees) / 2;
  const horizontal = Math.atan(Math.tan(vertical) * Math.max(.01, aspect));
  return radius / Math.sin(Math.min(vertical, horizontal)) * 1.12;
}
