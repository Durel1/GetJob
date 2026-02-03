import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Shield, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ConditionsUtilisation = () => {
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
              Conditions d'utilisation
            </h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Dernière mise à jour : 1er juin 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Bienvenue sur GetJob, la plateforme qui connecte les étudiants aux opportunités d'emploi locales. 
                En utilisant notre service, vous acceptez de respecter les présentes conditions d'utilisation. 
                Veuillez les lire attentivement avant d'utiliser notre plateforme.
              </p>
            </CardContent>
          </Card>

          {/* Acceptation des conditions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Acceptation des conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                En accédant à GetJob et en l'utilisant, vous acceptez d'être lié par ces conditions d'utilisation 
                et notre politique de confidentialité. Si vous n'acceptez pas ces conditions, veuillez ne pas 
                utiliser notre service.
              </p>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront 
                effet dès leur publication sur cette page.
              </p>
            </CardContent>
          </Card>

          {/* Description du service */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. Description du service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GetJob est une plateforme en ligne qui permet :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Aux étudiants de créer un profil et postuler à des offres d'emploi</li>
                <li>Aux recruteurs de publier des offres et gérer les candidatures</li>
                <li>La mise en relation entre étudiants et employeurs</li>
                <li>L'accès à des conseils carrière et ressources professionnelles</li>
              </ul>
            </CardContent>
          </Card>

          {/* Comptes utilisateurs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Comptes utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">3.1 Création de compte</h4>
              <p>
                Pour utiliser certaines fonctionnalités, vous devez créer un compte en fournissant des 
                informations exactes et complètes. Vous êtes responsable de maintenir la confidentialité 
                de vos identifiants de connexion.
              </p>
              
              <h4 className="font-semibold">3.2 Types de comptes</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Étudiants :</strong> Accès gratuit aux offres d'emploi et outils de candidature</li>
                <li><strong>Recruteurs :</strong> Publication d'offres et gestion des candidatures</li>
              </ul>

              <h4 className="font-semibold">3.3 Responsabilités</h4>
              <p>
                Vous vous engagez à ne pas partager vos identifiants, à notifier immédiatement tout 
                usage non autorisé de votre compte, et à maintenir vos informations à jour.
              </p>
            </CardContent>
          </Card>

          {/* Utilisation acceptable */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. Utilisation acceptable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>En utilisant GetJob, vous vous engagez à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir des informations véridiques et exactes</li>
                <li>Respecter les droits d'autrui</li>
                <li>Ne pas publier de contenu offensant, illégal ou inapproprié</li>
                <li>Ne pas utiliser la plateforme à des fins de spam ou de harcèlement</li>
                <li>Respecter la propriété intellectuelle</li>
              </ul>

              <Separator className="my-4" />

              <p>Il est strictement interdit de :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Créer de faux profils ou comptes multiples</li>
                <li>Publier des offres d'emploi frauduleuses</li>
                <li>Collecter des données personnelles d'autres utilisateurs</li>
                <li>Tenter de contourner les mesures de sécurité</li>
                <li>Utiliser des robots ou scripts automatisés</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contenu utilisateur */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. Contenu utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Vous conservez vos droits sur le contenu que vous publiez, mais vous accordez à GetJob 
                une licence non exclusive pour utiliser, afficher et distribuer ce contenu dans le cadre 
                de notre service.
              </p>
              <p>
                Nous nous réservons le droit de supprimer tout contenu qui viole ces conditions 
                d'utilisation ou qui est signalé comme inapproprié.
              </p>
            </CardContent>
          </Card>

          {/* Protection des données */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                6. Protection des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                La protection de vos données personnelles est notre priorité. Notre traitement des données 
                est régi par notre politique de confidentialité, qui fait partie intégrante de ces conditions.
              </p>
              <p>
                Nous nous engageons à respecter le RGPD et toutes les réglementations applicables en 
                matière de protection des données.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GetJob agit comme un intermédiaire entre étudiants et recruteurs. Nous ne sommes pas 
                responsables des relations d'emploi qui pourraient résulter de l'utilisation de notre plateforme.
              </p>
              <p>
                Notre service est fourni "en l'état" sans garanties expresses ou implicites. Nous ne 
                garantissons pas que le service sera ininterrompu ou exempt d'erreurs.
              </p>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GetJob et son contenu (design, textes, logos, etc.) sont protégés par les droits de 
                propriété intellectuelle. Toute reproduction non autorisée est interdite.
              </p>
              <p>
                Les marques et logos d'entreprises affichés appartiennent à leurs propriétaires respectifs.
              </p>
            </CardContent>
          </Card>

          {/* Résiliation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>9. Résiliation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Vous pouvez fermer votre compte à tout moment en nous contactant. Nous nous réservons 
                le droit de suspendre ou fermer des comptes en cas de violation de ces conditions.
              </p>
              <p>
                En cas de résiliation, certaines dispositions de ces conditions continueront de s'appliquer.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>10. Droit applicable et juridiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ces conditions sont régies par le droit français. Tout litige sera soumis à la 
                juridiction exclusive des tribunaux de Paris.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>11. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Pour toute question concernant ces conditions d'utilisation, contactez-nous :
              </p>
              <ul className="mt-2 space-y-1">
                <li>Email : contact@getjob.com</li>
                <li>Adresse : Ange Raphael, Douala Cameroon</li>
                <li>Téléphone : +237 6 90 48 49 04 </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConditionsUtilisation;