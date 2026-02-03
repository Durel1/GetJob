import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
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
              Contactez-nous
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une question, un problème ou une suggestion ? Notre équipe est là pour vous aider
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
                <CardDescription>
                  Plusieurs moyens de nous joindre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Adresse</h4>
                    <p className="text-sm text-muted-foreground">
                      Ange Raphaël<br />
                      Douala, Cameroun
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Téléphone</h4>
                    <p className="text-sm text-muted-foreground">
                      +237 6 90 48 49 04<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      contact@getjob.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Horaires</h4>
                    <p className="text-sm text-muted-foreground">
                      Lundi - Vendredi : 9h - 18h<br />
                      Samedi : 10h - 16h<br />
                      Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support rapide */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Support rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/centre-aide">
                  <Button variant="outline" className="w-full justify-start">
                    Centre d'aide
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  Chat en direct
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  FAQ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" placeholder="Votre prénom" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" placeholder="Votre nom" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="votre.email@exemple.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="06 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="account">Problème de compte</SelectItem>
                        <SelectItem value="billing">Facturation</SelectItem>
                        <SelectItem value="feature">Demande de fonctionnalité</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-32"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType">Vous êtes :</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Étudiant</SelectItem>
                        <SelectItem value="recruiter">Recruteur</SelectItem>
                        <SelectItem value="company">Entreprise</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    * Champs obligatoires. En envoyant ce formulaire, vous acceptez que nous traitions vos données pour répondre à votre demande.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section urgence */}
        <Card className="mt-12 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                Besoin d'une aide urgente ?
              </h3>
              <p className="text-orange-700 mb-4">
                Pour les problèmes critiques, contactez-nous directement par téléphone
              </p>
              <Button variant="outline" className="border-orange-300 text-orange-800 hover:bg-orange-100">
                <Phone className="w-4 h-4 mr-2" />
                Appeler maintenant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;