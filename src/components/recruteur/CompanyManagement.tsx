import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { Building, Edit, Trash2 } from "lucide-react";

// Type définissant la structure d'une entreprise dans la base de données
type Entreprise = {
  id_entreprise: string;
  nom_entreprise: string;
  localisation: string | null;
  site_web: string | null;
  domaine: string | null;
  description: string | null;
  id_recruteur: string;
};

export const CompanyManagement = () => {
  // Hook pour récupérer les informations de session de l'utilisateur connecté
  const { session } = useCustomSession();
  
  // État pour stocker la liste des entreprises du recruteur
  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  
  // État pour contrôler l'ouverture/fermeture de la boîte de dialogue
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // État pour savoir si on est en mode édition ou création
  const [isEditing, setIsEditing] = useState(false);
  
  // État pour stocker l'ID de l'entreprise en cours d'édition
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    nom_entreprise: "",
    localisation: "",
    site_web: "",
    domaine: "",
    description: "",
  });

  // Effet qui se déclenche quand la session change
  // Récupère les entreprises du recruteur connecté
  useEffect(() => {
    if (session?.id) {
      fetchEntreprises();
    }
  }, [session]);

  // Fonction pour récupérer toutes les entreprises du recruteur depuis la base de données
  const fetchEntreprises = async () => {
    if (!session?.id) return;

    // Requête Supabase pour récupérer les entreprises du recruteur connecté
    const { data, error } = await supabase
      .from("Entreprises")
      .select("*")
      .eq("id_recruteur", session.id);

    // Si la requête réussit, on met à jour l'état des entreprises
    if (data && !error) {
      setEntreprises(data);
    }
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Met à jour l'état du formulaire avec la nouvelle valeur
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire (création ou modification)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!session?.id) return;

    try {
      if (isEditing && editingId) {
        // Mode édition : met à jour l'entreprise existante
        const { error } = await supabase
          .from("Entreprises")
          .update(formData)
          .eq("id_entreprise", editingId);

        if (!error) {
          await fetchEntreprises(); // Recharge la liste des entreprises
          resetForm(); // Remet le formulaire à zéro
        }
      } else {
        // Mode création : insère une nouvelle entreprise
        const { error } = await supabase
          .from("Entreprises")
          .insert({
            ...formData,
            id_recruteur: session.id, // Associe l'entreprise au recruteur connecté
          });

        if (!error) {
          await fetchEntreprises(); // Recharge la liste des entreprises
          resetForm(); // Remet le formulaire à zéro
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  // Fonction pour supprimer une entreprise
  const handleDelete = async (id: string) => {
    // Demande confirmation à l'utilisateur
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?")) return;

    // Supprime l'entreprise de la base de données
    const { error } = await supabase
      .from("Entreprises")
      .delete()
      .eq("id_entreprise", id);

    if (!error) {
      await fetchEntreprises(); // Recharge la liste après suppression
    }
  };

  // Fonction pour remettre le formulaire à son état initial
  const resetForm = () => {
    setFormData({
      nom_entreprise: "",
      localisation: "",
      site_web: "",
      domaine: "",
      description: "",
    });
    setIsDialogOpen(false); // Ferme la boîte de dialogue
    setIsEditing(false); // Sort du mode édition
    setEditingId(null); // Remet l'ID d'édition à null
  };

  // Fonction pour préparer l'édition d'une entreprise
  const handleEdit = (entreprise: Entreprise) => {
    // Remplit le formulaire avec les données de l'entreprise à éditer
    setFormData({
      nom_entreprise: entreprise.nom_entreprise,
      localisation: entreprise.localisation || "",
      site_web: entreprise.site_web || "",
      domaine: entreprise.domaine || "",
      description: entreprise.description || "",
    });
    setIsEditing(true); // Active le mode édition
    setEditingId(entreprise.id_entreprise); // Stocke l'ID de l'entreprise à éditer
    setIsDialogOpen(true); // Ouvre la boîte de dialogue
  };

  // Fonction pour préparer la création d'une nouvelle entreprise
  const handleNewCompany = () => {
    resetForm(); // Remet le formulaire à zéro
    setIsDialogOpen(true); // Ouvre la boîte de dialogue
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      {/* En-tête avec titre et bouton d'action */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">Gestion des entreprises</h2>
        
        {/* Boîte de dialogue pour créer/modifier une entreprise */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewCompany} className="flex items-center gap-2 w-full sm:w-auto">
              <Building className="w-4 h-4" />
              <span className="text-sm sm:text-base">
                {entreprises.length === 0 ? "Profil société" : "Renseigner une autre Entreprise"}
              </span>
            </Button>
          </DialogTrigger>
          
          {/* Contenu de la boîte de dialogue */}
          <DialogContent className="sm:max-w-[500px] mx-4">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Modifier l'entreprise" : "Ajouter une entreprise"}
              </DialogTitle>
              <DialogDescription>
                Renseignez les informations de votre entreprise.
              </DialogDescription>
            </DialogHeader>
            
            {/* Formulaire pour saisir les informations de l'entreprise */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                {/* Champ nom de l'entreprise (obligatoire) */}
                <Input
                  placeholder="Nom de l'entreprise"
                  name="nom_entreprise"
                  value={formData.nom_entreprise}
                  onChange={handleInputChange}
                  required
                />
                {/* Champ localisation (optionnel) */}
                <Input
                  placeholder="Localisation"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleInputChange}
                />
                {/* Champ site web (optionnel) */}
                <Input
                  placeholder="Site web"
                  name="site_web"
                  value={formData.site_web}
                  onChange={handleInputChange}
                />
                {/* Champ domaine d'activité (optionnel) */}
                <Input
                  placeholder="Domaine d'activité"
                  name="domaine"
                  value={formData.domaine}
                  onChange={handleInputChange}
                />
                {/* Champ description (optionnel) */}
                <Textarea
                  placeholder="Description de l'entreprise"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                  Annuler
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {isEditing ? "Modifier" : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tableau des entreprises responsive */}
      {entreprises.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center sm:text-left">Mes entreprises</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Nom de l'entreprise</TableHead>
                    <TableHead className="min-w-[120px]">Localisation</TableHead>
                    <TableHead className="min-w-[120px]">Domaine</TableHead>
                    <TableHead className="min-w-[150px]">Site web</TableHead>
                    <TableHead className="min-w-[200px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {entreprises.map((entreprise) => (
                    <TableRow key={entreprise.id_entreprise}>
                      <TableCell className="font-medium">{entreprise.nom_entreprise}</TableCell>
                      <TableCell>{entreprise.localisation || "-"}</TableCell>
                      <TableCell>{entreprise.domaine || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{entreprise.site_web || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {/* Bouton pour modifier l'entreprise */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(entreprise)}
                            className="flex items-center gap-1 w-full sm:w-auto"
                          >
                            <Edit className="w-3 h-3" />
                            Modifier
                          </Button>
                          {/* Bouton pour supprimer l'entreprise */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(entreprise.id_entreprise)}
                            className="flex items-center gap-1 w-full sm:w-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
