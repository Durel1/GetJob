import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Users, User, FilePen, HelpCircle } from "lucide-react";

const features = [
  {
    icon: <Search className="w-7 h-7 text-primary" />,
    title: "Recherche intelligente",
    desc: "Trouvez des jobs près de votre campus avec des horaires compatibles avec vos cours.",
  },
  {
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    title: "Emplois flexibles",
    desc: "Des horaires adaptés à votre emploi du temps, temps partiel, weekends, vacances.",
  },
  {
    icon: <FilePen className="w-7 h-7 text-primary" />,
    title: "Employeurs locaux",
    desc: "Connectez‑vous directement avec des entreprises de votre région qui recrutent.",
  },
  {
    icon: <User className="w-7 h-7 text-primary" />,
    title: "Profil étudiant",
    desc: "Créez un profil qui met en valeur vos compétences et votre disponibilité.",
  },
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    title: "Candidature simplifiée",
    desc: "Postulez en un clic avec votre profil pré-rempli et suivez vos candidatures.",
  },
  {
    icon: <HelpCircle className="w-7 h-7 text-primary" />,
    title: "Support dédié",
    desc: "Une équipe à votre écoute pour vous accompagner dans votre recherche d'emploi.",
  }
];

const stats = [
  { value: "2,500+", label: "Étudiants inscrits" },
  { value: "450+", label: "Entreprises partenaires" },
  { value: "1,200+", label: "Jobs disponibles" },
];

const Home = () => (
  <main className="w-full min-h-screen bg-gradient-to-tl from-indigo-100 via-white to-blue-50 pb-0">
    {/* HERO SECTION */}
    <section
      className="relative w-full min-h-[550px] flex flex-col justify-center items-center animate-fade-in bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100"
    >
      {/* Plus d'overlay ni d'image de fond */}
      <div className="relative z-20 flex flex-col items-center w-full px-4">
        <div className="inline-block mb-6 px-4 py-1 bg-indigo-50 rounded-full text-indigo-700 font-semibold shadow-sm text-sm animate-fade-in">
          🎓 La plateforme #1 pour les jobs étudiants
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-700 via-blue-400 to-blue-300 text-transparent bg-clip-text drop-shadow-lg leading-tight text-center">
          Trouvez le job étudiant parfait
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto font-medium drop-shadow text-center">
          Connectez-vous avec des employeurs locaux et trouvez des opportunités d'emploi flexibles adaptées à votre emploi du temps d'étudiant.
        </p>
        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full">
          <Link to="/login" className="w-full sm:w-auto">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold shadow-lg px-7 py-3 text-lg w-full sm:w-64 flex gap-2 items-center justify-center">
              <Search className="w-5 h-5" /> Je cherche un job
            </Button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="outline" className="border-blue-900 text-blue-900 font-semibold px-7 py-3 text-lg w-full sm:w-64 flex gap-2 items-center justify-center hover:bg-blue-50 bg-white/90">
              <Users className="w-5 h-5" /> Je recrute des étudiants
            </Button>
          </Link>
        </div>
        {/* STATS */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-blue-900 drop-shadow">{stat.value}</div>
              <div className="text-gray-700 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* POURQUOI CHOISIR SECTION */}
    <section className="w-full bg-gradient-to-bl from-[#f9fbff] via-white to-blue-100 py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-3">Pourquoi choisir GetJob ?</h2>
      <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-lg">
        Une plateforme conçue spécifiquement pour les besoins des étudiants et des employeurs locaux.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl shadow-md border border-blue-100 px-7 py-8 flex flex-col items-start gap-4 hover:scale-105 transition-transform duration-200"
          >
            <span className="block bg-blue-50 rounded-xl p-3">{f.icon}</span>
            <h3 className="font-bold text-xl text-blue-900">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CALL TO ACTION FINAL */}
    <section className="container max-w-4xl mx-auto px-4 pt-10 -mb-12 flex flex-col items-center justify-center">
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg py-14 px-6 md:px-20 text-center w-full flex flex-col items-center justify-center" style={{width: "calc(100% - 2rem)"}}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">Prêt à commencer votre recherche ?</h2>
        <p className="text-blue-100 mb-7 text-lg text-center">
          Rejoignez des milliers d'étudiants qui ont déjà trouvé leur job idéal grâce à notre plateforme.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
          <Link to="/register" className="w-full md:w-auto">
            <Button variant="secondary" className="w-full md:w-[260px] bg-white text-blue-900 font-semibold hover:bg-blue-50 flex gap-2 justify-center items-center text-lg shadow-sm">
              <User className="w-5 h-5" /> S'inscrire maintenant
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <div className="pb-16"></div>
  </main>
);

export default Home;
