import { useEffect } from "react";
import { canUseDOM, useRuntime } from "vtex.render-runtime";

const ValidationHeaderPDP = () => {
  const runtime = useRuntime();
  const device = runtime?.deviceInfo?.type;

  useEffect(() => {
    if (runtime && device === "desktop") {
      if (canUseDOM) {
        window.addEventListener("scroll", function () {
          const [topBar] = document.getElementsByClassName(
            "vtex-flex-layout-0-x-flexRow--header-topbar"
          );
          const [stickyDesk] = document.getElementsByClassName(
            "vtex-sticky-layout-0-x-wrapper--pdp-sticky-bar-desk"
          );

          if (
            stickyDesk?.classList?.contains(
              "vtex-sticky-layout-0-x-wrapper--pdp-sticky-bar-desk--stuck"
            )
          ) {
            topBar.classList.add("dn");
          } else {
            topBar.classList.remove("dn");
          }
        });
      }
    } else {
      if (canUseDOM) {
        window.addEventListener("scroll", function () {
          const [header] = document.getElementsByClassName(
            "vtex-sticky-layout-0-x-wrapper--header-mobile"
          );
          const [stickyMob] = document.getElementsByClassName(
            "vtex-sticky-layout-0-x-wrapper--pdp-sticky-bar-mob"
          );

          if (
            stickyMob?.classList?.contains(
              "vtex-sticky-layout-0-x-wrapper--pdp-sticky-bar-mob--stuck"
            )
          ) {
            header.classList.add("dn");
          } else {
            header.classList.remove("dn");
          }
        });
      }
    }
  }, [canUseDOM]);

  return null;
};

export default ValidationHeaderPDP;
