import { contentQs, uiuxQs, vfxgfxQs } from "@/data/creativesQs";
import { appDevQs, mlQs, webDevQs } from "../data/techQs";
import { eventsQs, prQs, sponsorshipQs } from "@/data/corporateQs";

export function generateQs(subdomain: string) {
  switch (subdomain) {
    case "Web Development":
      return webDevQs;
    case "App Development":
      return appDevQs;
    case "ML":
      return mlQs;
    case "UI/UX":
      return uiuxQs;
    case "VFX/GFX":
      return vfxgfxQs;
    case "Conntent":
      return contentQs;
    case "PR":
      return prQs;
    case "Sponsorship":
      return sponsorshipQs;
    case "Events":
      return eventsQs;
  }
}
