type GsapModules = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let modules: Promise<GsapModules> | undefined;

/** Loads GSAP + ScrollTrigger on demand (once) so they stay out of the initial bundle. */
export function loadGsap() {
  modules ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return modules;
}
