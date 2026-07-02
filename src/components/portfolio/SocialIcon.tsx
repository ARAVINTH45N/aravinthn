import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaMedium,
  FaResearchgate,
} from "react-icons/fa6";
import { SiLeetcode, SiHackerrank, SiGooglescholar } from "react-icons/si";
import { Mail } from "lucide-react";
import type { ComponentType } from "react";

const map: Record<string, ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  medium: FaMedium,
  researchgate: FaResearchgate,
  leetcode: SiLeetcode,
  hackerrank: SiHackerrank,
  scholar: SiGooglescholar,
  mail: Mail,
};

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Mail;
  return <Icon className={className} />;
}
