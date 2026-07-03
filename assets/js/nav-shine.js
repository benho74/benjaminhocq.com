/* ===========================================================
   Nav shine — liquid metal shader sur le contour du menu
   Charge @paper-design/shaders via esm.sh (import dynamique).
   =========================================================== */
(async () => {
  "use strict";

  const host = document.getElementById("nav-shine");
  if (!host) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // La lib exige WebGL2 ; sinon on garde le fallback CSS (bordure iridescente).
  const gl = document.createElement("canvas").getContext("webgl2");
  if (!gl) return;

  let mod;
  try {
    mod = await import("https://esm.sh/@paper-design/shaders");
  } catch (e) {
    console.warn("[nav-shine] shader library failed to load:", e);
    return;
  }

  const ShaderMount = mod.ShaderMount;
  const shader = mod.liquidMetalFragmentShader;
  if (!ShaderMount || !shader) {
    console.warn("[nav-shine] expected exports missing", Object.keys(mod));
    return;
  }

  const uniforms = {
    u_repetition: 4,
    u_softness: 0.5,
    u_shiftRed: 0.3,
    u_shiftBlue: 0.3,
    u_distortion: 0,
    u_contour: 0,
    u_angle: 45,
    u_scale: 8,
    u_shape: 1,
    u_offsetX: 0.1,
    u_offsetY: -0.1
  };

  let mount;
  try {
    mount = new ShaderMount(host, shader, uniforms, undefined, 0.6);
  } catch (e) {
    console.warn("[nav-shine] mount failed:", e);
    return;
  }

  host.classList.add("is-ready");

  const nav = host.closest(".nav");
  if (nav) {
    nav.addEventListener("mouseenter", () => mount?.setSpeed?.(1));
    nav.addEventListener("mouseleave", () => mount?.setSpeed?.(0.6));
  }
})();
