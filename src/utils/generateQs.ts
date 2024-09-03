import { creativesQs } from "@/data/creativesQs";
import { appDevQs, webDevQs } from "../data/techQs";
import { eventsQs, prQs, sponsorshipQs } from "@/data/corporateQs";

export function generateQs(subdomain: string) {
  switch (subdomain) {
    case "Web Development":
      return webDevQs;
    case "App Development":
      return appDevQs;
    case "Creatives":
      return creativesQs;
    case "PR":
      return prQs;
    case "Sponsorship":
      return sponsorshipQs;
    case "Events":
      return eventsQs;
  }
}
