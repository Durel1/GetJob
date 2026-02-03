
import { Link, useLocation } from "react-router-dom";
import { useCustomSession } from "@/hooks/useCustomSession";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import * as React from "react";

// Exemple d’utilisation (optionnel) :
// const { session, logoutSession } = useCustomSession();
//
// Peut afficher des liens conditionnels selon la session si tu veux.

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Connexion", to: "/login" },
  { label: "Inscription", to: "/register" },
];

const Navbar = () => {
  const location = useLocation();
  const { session, logoutSession } = useCustomSession();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <nav className="w-full bg-white border-b border-border shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight transition-transform duration-200 hover:scale-105 hover:from-indigo-600 hover:to-blue-900"
          style={{ fontFamily: `Playfair Display, serif` }}
        >
          Get<span className="font-bold text-blue-800">Job</span>
        </Link>
        {/* Desktop navigation */}
        {!isMobile && (
          <div className="flex gap-2 sm:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  px-3 py-1 rounded-full transition
                  relative text-base font-medium 
                  duration-200
                  ${
                    location.pathname === item.to
                      ? "text-primary bg-blue-100 shadow underline underline-offset-4"
                      : "text-muted-foreground hover:text-blue-900 hover:bg-blue-50 hover:scale-105"
                  }
                  group
                `}
              >
                <span className="
                  relative
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:w-0
                  after:h-0.5
                  after:bg-gradient-to-r after:from-blue-700 after:to-blue-400
                  after:rounded
                  after:transition-all
                  after:duration-300
                  group-hover:after:w-full
                  group-hover:after:block
                  ">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        )}
        {/* Mobile navigation: menu hamburger & drawer */}
        {isMobile && (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <button
                aria-label="Ouvrir le menu"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-50 transition"
              >
                <Menu className="w-7 h-7 text-blue-900" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-3 py-4 px-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-blue-900">Menu</span>
                  <DrawerClose asChild>
                    <button
                      aria-label="Fermer le menu"
                      className="p-2 rounded-md hover:bg-blue-50 transition"
                    >
                      <X className="w-6 h-6 text-blue-800" />
                    </button>
                  </DrawerClose>
                </div>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <DrawerClose asChild key={item.to}>
                      <Link
                        to={item.to}
                        className={`
                          block px-4 py-2 rounded-full text-lg font-medium transition
                          ${
                            location.pathname === item.to
                              ? "text-primary bg-blue-100 shadow underline underline-offset-4"
                              : "text-muted-foreground hover:text-blue-900 hover:bg-blue-50 hover:scale-105"
                          }
                        `}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
