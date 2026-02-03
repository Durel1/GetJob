
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const footerLinks = [
  {
    heading: "Étudiants",
    links: [
      { to: "/login", label: "Rechercher un job" },
      { to: "/register", label: "Créer un profil" },
      { to: "/conseils-carriere", label: "Conseils carrière" },
    ],
  },
  {
    heading: "Employeurs",
    links: [
      { to: "/login", label: "Publier une offre" },
      { to: "/login", label: "Gérer les candidatures" },
      { to: "#", label: "Tarifs" },
    ],
  },
  {
    heading: "Support",
    links: [
      { to: "/centre-aide", label: "Centre d'aide" },
      { to: "/contact", label: "Contact" },
      { to: "/conditions-utilisation", label: "Conditions d'utilisation" },
    ],
  },
];

const Footer = () => (
  <footer className="w-full bg-black text-white pt-12 pb-6 mt-10 border-t border-white/10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 items-start pb-8 border-b border-white/10">
        <div className="space-y-3 mb-8 md:mb-0">
          <Link to="/" className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center bg-white/5 rounded-lg p-2">
              <Briefcase className="w-7 h-7 text-indigo-200" />
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-white">GetJob</span>
          </Link>
          <p className="text-neutral-300 text-sm leading-snug max-w-[230px]">
            La plateforme qui connecte les étudiants aux opportunités d'emploi locales.
          </p>
        </div>
        {footerLinks.map((col) => (
          <div key={col.heading} className="">
            <h4 className="font-semibold text-base mb-2 text-white">{col.heading}</h4>
            <ul className="space-y-1">
              {col.links.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-neutral-300 hover:text-indigo-400 transition-colors text-[15px]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-6">
        <span className="text-neutral-400 text-sm mx-auto md:mx-0 text-center w-full">
          © {new Date().getFullYear()} GetJob. Tous droits réservés.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;

