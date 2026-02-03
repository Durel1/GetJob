import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Users, TrendingUp, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const conseils = [
  {
    icon: Target,
    title: "Définir ses objectifs professionnels",
    description: "Clarifiez vos aspirations et tracez un plan de carrière réaliste.",
    tips: [
      "Identifiez vos valeurs et passions",
      "Analysez vos compétences actuelles",
      "Fixez des objectifs SMART",
      "Créez un plan d'action sur 1, 3 et 5 ans"
    ]
  },
  {
    icon: BookOpen,
    title: "Optimiser son CV et profil",
    description: "Créez un profil professionnel qui se démarque et attire les recruteurs.",
    tips: [
      "Utilisez des mots-clés pertinents",
      "Quantifiez vos réalisations",
      "Adaptez votre CV à chaque offre",
      "Soignez votre photo professionnelle"
    ]
  },
  {
    icon: Users,
    title: "Développer son réseau professionnel",
    description: "Construisez et entretenez des relations professionnelles durables.",
    tips: [
      "Participez à des événements étudiants",
      "Rejoignez des groupes LinkedIn",
      "Sollicitez des entretiens informatifs",
      "Maintenez le contact avec vos anciens stages"
    ]
  },
  {
    icon: TrendingUp,
    title: "Se former continuellement",
    description: "Développez vos compétences pour rester compétitif sur le marché.",
    tips: [
      "Identifiez les compétences demandées",
      "Suivez des formations en ligne",
      "Obtenez des certifications",
      "Pratiquez l'apprentissage par projet"
    ]
  }
];

const secteurs = [
  { nom: "Technologie", croissance: "+15%", couleur: "bg-blue-500" },
  { nom: "Santé", croissance: "+12%", couleur: "bg-green-500" },
  { nom: "Finance", croissance: "+8%", couleur: "bg-purple-500" },
  { nom: "E-commerce", croissance: "+20%", couleur: "bg-orange-500" },
  { nom: "Éducation", croissance: "+10%", couleur: "bg-indigo-500" }
];

const ConseilsCarriere = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Conseils Carrière
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos conseils d'experts pour booster votre carrière et réussir votre insertion professionnelle
            </p>
          </div>
        </div>

        {/* Conseils principaux */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {conseils.map((conseil, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <conseil.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{conseil.title}</CardTitle>
                    <CardDescription>{conseil.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conseil.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secteurs porteurs */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Secteurs porteurs en 2024
            </CardTitle>
            <CardDescription>
              Les domaines avec les meilleures perspectives d'emploi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {secteurs.map((secteur, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className={`w-3 h-3 ${secteur.couleur} rounded-full mx-auto mb-2`}></div>
                  <h4 className="font-medium mb-1">{secteur.nom}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {secteur.croissance}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to action */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Prêt à décrocher votre emploi idéal ?</h3>
            <p className="text-muted-foreground mb-4">
              Créez votre profil dès maintenant et accédez aux meilleures opportunités
            </p>
            <Link 
              to="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Créer mon profil
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConseilsCarriere;