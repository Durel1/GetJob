import { Link } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, Phone, Mail, HelpCircle, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faq = [
  {
    question: "Comment créer mon profil étudiant ?",
    answer: "Cliquez sur 'S'inscrire' puis choisissez 'Étudiant'. Remplissez vos informations personnelles, ajoutez votre CV et complétez votre profil avec vos compétences et expériences."
  },
  {
    question: "Comment postuler à une offre d'emploi ?",
    answer: "Connectez-vous à votre compte étudiant, parcourez les offres disponibles et cliquez sur 'Postuler' sur l'offre qui vous intéresse. Votre profil sera automatiquement envoyé au recruteur."
  },
  {
    question: "Comment publier une offre d'emploi ?",
    answer: "Créez un compte recruteur, complétez les informations de votre entreprise, puis accédez à votre tableau de bord pour publier vos offres d'emploi."
  },
  {
    question: "Puis-je modifier mon profil après inscription ?",
    answer: "Oui, vous pouvez modifier votre profil à tout moment depuis votre tableau de bord. Nous recommandons de le tenir à jour régulièrement."
  },
  {
    question: "Comment suivre mes candidatures ?",
    answer: "Dans votre tableau de bord étudiant, vous trouverez une section 'Mes candidatures' qui affiche le statut de toutes vos candidatures en cours."
  },
  {
    question: "GetJob est-il gratuit ?",
    answer: "Oui, GetJob est entièrement gratuit pour les étudiants. Les recruteurs bénéficient également d'un accès gratuit aux fonctionnalités de base."
  }
];

const categories = [
  {
    icon: Users,
    title: "Compte et profil",
    description: "Gestion de votre compte, modification du profil, paramètres",
    count: "12 articles"
  },
  {
    icon: FileText,
    title: "Candidatures",
    description: "Postuler, suivre ses candidatures, conseils",
    count: "8 articles"
  },
  {
    icon: HelpCircle,
    title: "Fonctionnalités",
    description: "Guide d'utilisation des différentes fonctionnalités",
    count: "15 articles"
  }
];

const CentreAide = () => {
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
              Centre d'aide
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Trouvez rapidement les réponses à vos questions sur GetJob
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher dans l'aide..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Contact rapide */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Chat en direct</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Disponible du lundi au vendredi, 9h-18h
              </p>
              <Button variant="outline" size="sm">
                Démarrer le chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Réponse sous 24h en moyenne
              </p>
              <Button variant="outline" size="sm">
                Envoyer un email
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                6 90 48 49 04
              </p>
              <Button variant="outline" size="sm">
                Nous appeler
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Catégories d'aide */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Parcourir par catégorie</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription className="text-sm">{category.count}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground pl-8">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section contact */}
        <Card className="mt-12 text-center">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-muted-foreground mb-4">
              Notre équipe support est là pour vous aider
            </p>
            <Link to="/contact">
              <Button>
                Nous contacter
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CentreAide;