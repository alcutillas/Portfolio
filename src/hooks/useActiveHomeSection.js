import { useEffect, useState } from "react";
import {
  getActiveHomeSectionId,
  subscribeActiveHomeSection,
} from "../utils/sectionScroll";

export default function useActiveHomeSection() {
  const [sectionId, setSectionId] = useState(getActiveHomeSectionId);

  useEffect(() => subscribeActiveHomeSection(setSectionId), []);

  return sectionId;
}
