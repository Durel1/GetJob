
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Interface définissant les propriétés attendues par le composant CVStep
 * Assure un typage strict des props
 */
type Props = {
  value: string; // Nom du fichier CV stocké (peut être vide initialement)
  onChange: (fileName: string) => void; // Callback pour les modifications
  userId?: string; // ID de l'utilisateur pour le stockage
};

/**
 * Composant pour l'étape de téléchargement du CV dans le formulaire multi-étapes
 * Permet à l'étudiant de télécharger son CV directement sur Supabase Storage
 * 
 * Fonctionnalités :
 * - Upload de fichiers PDF, DOC, DOCX
 * - Validation du type et de la taille du fichier
 * - Stockage sécurisé dans Supabase Storage
 * - Prévisualisation du fichier uploadé
 * 
 * @param value - Nom du fichier CV actuel
 * @param onChange - Fonction appelée lors des modifications
 * @param userId - ID de l'utilisateur pour le dossier de stockage
 * @returns JSX.Element - Interface d'upload de CV
 */
export default function CVStep({ value, onChange, userId }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation du type de fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format de fichier non supporté. Utilisez PDF, DOC ou DOCX.");
      return;
    }

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier est trop volumineux. Taille maximale : 5MB.");
      return;
    }

    setUploading(true);

    try {
      // Supprimer l'ancien fichier s'il existe
      if (value && userId) {
        await supabase.storage
          .from('cvs')
          .remove([`${userId}/${value}`]);
      }

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `cv_${Date.now()}.${fileExt}`;
      const filePath = userId ? `${userId}/${fileName}` : fileName;

      // Upload du nouveau fichier
      const { error } = await supabase.storage
        .from('cvs')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      onChange(fileName);
      toast.success("CV téléchargé avec succès !");
    } catch (error) {
      console.error('Erreur upload CV:', error);
      toast.error("Erreur lors du téléchargement du CV.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!value || !userId) return;

    try {
      await supabase.storage
        .from('cvs')
        .remove([`${userId}/${value}`]);
      
      onChange("");
      toast.success("CV supprimé avec succès !");
    } catch (error) {
      console.error('Erreur suppression CV:', error);
      toast.error("Erreur lors de la suppression du CV.");
    }
  };

  return (
    <div className="space-y-4">
      {!value ? (
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Télécharger votre CV</p>
          <p className="text-sm text-muted-foreground mb-4">
            Formats acceptés : PDF, DOC, DOCX (max 5MB)
          </p>
          <Button 
            type="button" 
            variant="outline" 
            disabled={uploading}
          >
            {uploading ? "Téléchargement..." : "Choisir un fichier"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <File className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium">{value}</p>
              <p className="text-sm text-muted-foreground">CV téléchargé</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
