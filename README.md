# 🎓 Getjob - Plateforme de Mise en Relation Étudiants-Recruteurs

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Une plateforme moderne pour connecter les talents étudiants aux opportunités professionnelles**

[🚀 Tester l'appli](https://my-getjob-app.vercel.app/) • [📖 Documentation](#-documentation) • [🛠️ Installation](#️-installation)

</div>

---

## 📋 Table des Matières

- [🎯 Contexte du Projet](#-contexte-du-projet)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Stack Technique](#️-stack-technique)
- [📊 Modèle de Données](#-modèle-de-données)
- [🚀 Installation](#-installation)
- [📁 Structure du Projet](#-structure-du-projet)
- [🔐 Sécurité](#-sécurité)
- [📧 Système de Notifications](#-système-de-notifications)
- [🎨 Design System](#-design-system)
- [🤝 Contribution](#-contribution)

---

## 🎯 Contexte du Projet

### Problématique

Les étudiants rencontrent souvent des difficultés pour :
- Trouver des stages ou emplois adaptés à leur profil
- Gérer leurs candidatures de manière centralisée
- Mettre en valeur leurs compétences auprès des recruteurs

Les recruteurs, de leur côté, peinent à :
- Identifier les talents étudiants qualifiés
- Gérer efficacement les candidatures reçues
- Accéder rapidement aux informations des candidats (CV, compétences, disponibilités)

### Solution

**StageConnect** est une plateforme web qui répond à ces besoins en offrant :

| Pour les Étudiants | Pour les Recruteurs |
|-------------------|---------------------|
| 📝 Création de profil professionnel complet | 🏢 Gestion d'entreprise simplifiée |
| 📄 Upload et partage de CV | 📢 Publication d'offres d'emploi |
| 🔍 Recherche d'offres avec filtres | 👥 Visualisation des profils candidats |
| 📊 Suivi des candidatures en temps réel | ✅ Gestion des statuts de candidature |
| 📧 Notifications par email | 📧 Alertes nouvelles candidatures |

### Avantages Clés

- ⚡ **Performance** : Application SPA ultra-rapide avec Vite
- 🎨 **UX Moderne** : Interface intuitive et responsive
- 🔒 **Sécurité** : Authentification personnalisée avec hashage des mots de passe
- 📱 **Responsive** : Compatible desktop, tablette et mobile
- 🌐 **Temps Réel** : Synchronisation avec Supabase
- 📧 **Notifications** : Emails automatiques via Edge Functions

---

## ✨ Fonctionnalités

### 👨‍🎓 Espace Étudiant

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD ÉTUDIANT                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Profil    │  │ Candidatures│  │  Recherche  │          │
│  │  Multi-step │  │   Suivi     │  │   Offres    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  • Informations personnelles      • Statuts en temps réel   │
│  • Formation & Compétences        • Historique complet      │
│  • Upload CV (PDF/DOC/DOCX)       • Filtres avancés         │
│  • Photo de profil                • Masquage d'offres       │
│  • Lien GitHub                    • Contact recruteur       │
└─────────────────────────────────────────────────────────────┘
```

**Détail des fonctionnalités :**

1. **Inscription & Connexion**
   - Création de compte avec validation
   - Connexion sécurisée
   - Récupération de mot de passe par email

2. **Profil Multi-étapes**
   - Étape 1 : Informations personnelles (localisation, disponibilité)
   - Étape 2 : Formation (établissement, domaine, niveau)
   - Étape 3 : Photo de profil
   - Étape 4 : Upload CV

3. **Gestion des Candidatures**
   - Postuler en un clic
   - Suivi des statuts : En attente → Entretien → Accepté/Refusé
   - Historique complet des candidatures

4. **Recherche d'Offres**
   - Recherche textuelle
   - Filtres par type de contrat, niveau d'études
   - Masquage des offres non pertinentes

### 👔 Espace Recruteur

```
┌─────────────────────────────────────────────────────────────┐
│                   DASHBOARD RECRUTEUR                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Entreprise  │  │   Offres    │  │ Candidatures│          │
│  │   Gestion   │  │  Emploi     │  │   Reçues    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  • Création/Modification          • Publication rapide      │
│  • Informations complètes         • Liste des annonces      │
│  • Site web & Localisation        • Profils candidats       │
│  • Description & Domaine          • Téléchargement CV       │
└─────────────────────────────────────────────────────────────┘
```

**Détail des fonctionnalités :**

1. **Gestion d'Entreprise**
   - Création du profil entreprise
   - Modification des informations
   - Logo, site web, description

2. **Publication d'Offres**
   - Formulaire complet (poste, description, compétences)
   - Type de contrat (Stage, CDI, CDD, Freelance, Alternance)
   - Niveau d'études requis
   - Horaires de travail

3. **Gestion des Candidatures**
   - Vue d'ensemble des candidatures par offre
   - Consultation du profil candidat
   - Téléchargement du CV
   - Modification du statut avec notification automatique

---

## 🏗️ Architecture

### Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    React + Vite                      │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │  Pages  │ │Components│ │  Hooks  │ │   UI    │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Supabase Client SDK                     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    SUPABASE                          │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │    │
│  │  │PostgreSQL│ │ Storage │ │  Edge   │ │  RLS    │   │    │
│  │  │ Database │ │  (CVs)  │ │Functions│ │Policies │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Flux de Données

```
Utilisateur ──► React Router ──► Page/Component
                                      │
                                      ▼
                               Custom Session
                               (Context API)
                                      │
                                      ▼
                              Supabase Client
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
               Database           Storage         Edge Functions
             (PostgreSQL)         (CVs)            (Emails)
```

---

## 🛠️ Stack Technique

### Frontend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 18.3 | Framework UI principal |
| **TypeScript** | 5.x | Typage statique |
| **Vite** | 5.x | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Styling utility-first |
| **shadcn/ui** | Latest | Composants UI accessibles |
| **React Router** | 6.x | Navigation SPA |
| **React Query** | 5.x | Gestion état serveur |
| **React Hook Form** | 7.x | Gestion formulaires |
| **Zod** | 3.x | Validation de schémas |
| **Lucide React** | Latest | Icônes |
| **Sonner** | 1.x | Notifications toast |
| **Framer Motion** | - | Animations (via shadcn) |

### Backend (Supabase)

| Service | Utilisation |
|---------|-------------|
| **PostgreSQL** | Base de données relationnelle |
| **Supabase Auth** | Structure disponible (non utilisée) |
| **Supabase Storage** | Stockage des CVs |
| **Edge Functions** | Envoi d'emails (Deno) |
| **Row Level Security** | Politiques de sécurité |

### Outils de Développement

| Outil | Utilisation |
|-------|-------------|
| **ESLint** | Linting du code |
| **PostCSS** | Processing CSS |
| **Git** | Versioning |

---

## 📊 Modèle de Données

### Diagramme Entité-Relation

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    etudiants    │       │   Candidatures  │       │   offre_emploi  │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id_etudiant (PK)│◄──────│ id_etudiant (FK)│       │id_offre_emploi  │
│ nom             │       │ id_candidature  │──────►│     (PK)        │
│ email           │       │id_offre_emploi  │       │ poste           │
│ telephone       │       │id_profil_etudiant       │ description     │
│ mot_de_passe    │       │ Statu           │       │ type_contrat    │
│ created_at      │       │ created_at      │       │ competance      │
│ updated_at      │       │ updated_at      │       │ niveau_etude    │
└────────┬────────┘       └────────┬────────┘       │ horaires_travail│
         │                         │                │ id_entreprise(FK)
         │                         │                │ id_recruteur(FK)│
         ▼                         ▼                └────────┬────────┘
┌─────────────────┐       ┌─────────────────┐                │
│Profil_Etudiants │       │                 │                │
├─────────────────┤       │                 │                │
│id_profil_etudiant       │                 │                │
│ id_etudiant (FK)│◄──────┘                 │                │
│ Etablissement   │                         │                │
│ Domaine_Etudes  │                         │                ▼
│ Niveau_etudes   │                  ┌─────────────────┐    ┌─────────────────┐
│ Competances     │                  │   Entreprises   │◄───│   recruteurs    │
│ Localisation    │                  ├─────────────────┤    ├─────────────────┤
│ Disponibilité   │                  │ id_entreprise(PK)    │id_recruteur (PK)│
│ CV              │                  │ nom_entreprise  │    │ nom             │
│ URL_GitHub      │                  │ description     │    │ email           │
└─────────────────┘                  │ domaine         │    │ telephone       │
                                     │ localisation    │    │ mot_de_passe    │
                                     │ site_web        │    └─────────────────┘
                                     │id_recruteur (FK)│
                                     └─────────────────┘
```

### Description des Tables

| Table | Description | Champs Clés |
|-------|-------------|-------------|
| `etudiants` | Comptes des étudiants | email, mot_de_passe, nom, telephone |
| `Profil_Etudiants` | Profils détaillés | CV, Competances, Disponibilité, URL_GitHub |
| `recruteurs` | Comptes des recruteurs | email, mot_de_passe, nom, telephone |
| `Entreprises` | Entreprises des recruteurs | nom_entreprise, description, domaine |
| `offre_emploi` | Offres publiées | poste, type_contrat, competance, niveau_etude |
| `Candidatures` | Candidatures soumises | Statu (pending/accepted/rejected/interview) |

---

## 🚀 Installation

### Prérequis

- **Node.js** 18+ ou **Bun** runtime
- **npm** ou **bun** package manager
- Compte **Supabase** (gratuit)

### Étapes d'Installation

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/stageconnect.git
cd stageconnect

# 2. Installer les dépendances
npm install
# ou
bun install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase

# 4. Lancer le serveur de développement
npm run dev
# ou
bun run dev

# 5. Ouvrir dans le navigateur
# http://localhost:5173
```

### Variables d'Environnement

```env
VITE_SUPABASE_PROJECT_ID="votre_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="votre_anon_key"
VITE_SUPABASE_URL="https://votre-projet.supabase.co"
```

### Configuration Supabase

1. **Créer un projet** sur [supabase.com](https://supabase.com)
2. **Exécuter les migrations** SQL (dossier `supabase/migrations/`)
3. **Configurer le Storage** :
   - Créer un bucket `cvs` pour les CV
   - Créer un bucket `profile-photos` pour les photos
4. **Déployer les Edge Functions** :
   ```bash
   supabase functions deploy send-application-notification
   supabase functions deploy send-status-update
   supabase functions deploy send-password-reset
   supabase functions deploy send-password-confirmation
   ```

---

## 📁 Structure du Projet

```
stageconnect/
├── 📁 public/                    # Assets statiques
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 auth/              # Composants d'authentification
│   │   │   └── ForgotPassword.tsx
│   │   │
│   │   ├── 📁 etudiant/          # Composants espace étudiant
│   │   │   ├── AnnonceSearch.tsx
│   │   │   ├── DernieresAnnonces.tsx
│   │   │   ├── EtudiantCandidatures.tsx
│   │   │   ├── EtudiantProfileView.tsx
│   │   │   ├── MultiStepProfileForm.tsx
│   │   │   ├── 📁 components/    # Sous-composants
│   │   │   ├── 📁 hooks/         # Hooks spécifiques
│   │   │   └── 📁 profileSteps/  # Étapes du formulaire
│   │   │
│   │   ├── 📁 recruteur/         # Composants espace recruteur
│   │   │   ├── AnnonceList.tsx
│   │   │   ├── CompanyManagement.tsx
│   │   │   ├── JobApplicationsManagement.tsx
│   │   │   ├── JobOfferManagement.tsx
│   │   │   ├── 📁 components/
│   │   │   ├── 📁 dashboard/
│   │   │   ├── 📁 hooks/
│   │   │   ├── 📁 types/
│   │   │   └── 📁 utils/
│   │   │
│   │   ├── 📁 ui/                # Composants shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (50+ composants)
│   │   │
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   ├── 📁 hooks/                 # Hooks globaux
│   │   ├── CustomSessionProvider.tsx
│   │   ├── useCustomSession.ts
│   │   ├── useSession.ts
│   │   ├── useEmailNotifications.ts
│   │   └── use-mobile.tsx
│   │
│   ├── 📁 integrations/
│   │   └── 📁 supabase/
│   │       ├── client.ts         # Client Supabase
│   │       └── types.ts          # Types auto-générés
│   │
│   ├── 📁 lib/
│   │   └── utils.ts              # Utilitaires (cn, etc.)
│   │
│   ├── 📁 pages/                 # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── RegisterEtudiant.tsx
│   │   ├── RegisterRecruteur.tsx
│   │   ├── DashboardEtudiant.tsx
│   │   ├── DashboardRecruteur.tsx
│   │   ├── CentreAide.tsx
│   │   ├── ConditionsUtilisation.tsx
│   │   ├── ConfirmPasswordReset.tsx
│   │   ├── ConseilsCarriere.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                   # Composant racine + Routes
│   ├── App.css
│   ├── index.css                 # Styles globaux + Variables
│   ├── main.tsx                  # Point d'entrée
│   └── vite-env.d.ts
│
├── 📁 supabase/
│   ├── 📁 functions/             # Edge Functions
│   │   ├── send-application-notification/
│   │   ├── send-password-confirmation/
│   │   ├── send-password-reset/
│   │   └── send-status-update/
│   ├── 📁 migrations/            # Migrations SQL
│   └── config.toml
│
├── .env                          # Variables d'environnement
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔐 Sécurité

### Authentification Personnalisée

Le projet utilise un système d'authentification **custom** (non Supabase Auth) :

```typescript
// Session stockée en localStorage
interface CustomSession {
  id: string;       // UUID de l'utilisateur
  nom: string;      // Nom complet
  email: string;    // Email
  userType: "etudiant" | "recruteur";
}
```

### Hashage des Mots de Passe

Les mots de passe sont hashés côté serveur avant stockage (à implémenter avec bcrypt ou argon2).

### Row Level Security (RLS)

Politiques de sécurité configurées sur Supabase :

| Table | Politique | Description |
|-------|-----------|-------------|
| `Entreprises` | SELECT public | Entreprises visibles par tous |
| `Profil_Etudiants` | SELECT public | Profils visibles par tous |
| `Profil_Etudiants` | UPDATE owner | Seul le propriétaire peut modifier |

### Recommandations

- ⚠️ Activer RLS sur toutes les tables
- ⚠️ Implémenter le hashage des mots de passe
- ⚠️ Ajouter la validation côté serveur
- ⚠️ Configurer CORS correctement

---

## 📧 Système de Notifications

### Edge Functions

Quatre fonctions serverless pour l'envoi d'emails :

| Fonction | Déclencheur | Description |
|----------|-------------|-------------|
| `send-application-notification` | Nouvelle candidature | Notifie le recruteur |
| `send-status-update` | Changement statut | Notifie l'étudiant |
| `send-password-reset` | Demande réinit. | Email avec lien |
| `send-password-confirmation` | Mot de passe changé | Confirmation |

### Exemple d'Utilisation

```typescript
// Appel depuis le frontend
const { error } = await supabase.functions.invoke('send-status-update', {
  body: {
    to: candidat.email,
    candidateName: candidat.nom,
    jobTitle: offre.poste,
    status: 'accepted',
    companyName: entreprise.nom
  }
});
```

---

## 🎨 Design System

### Palette de Couleurs

**Espace Étudiant** (Thème Bleu)
```css
--primary: 221 83% 53%;        /* Bleu principal */
--primary-foreground: 210 40% 98%;
/* Gradient: from-blue-600 to-indigo-600 */
```

**Espace Recruteur** (Thème Orange)
```css
--primary: 25 95% 53%;         /* Orange principal */
--primary-foreground: 60 9.1% 97.8%;
/* Gradient: from-orange-600 to-red-600 */
```

### Composants UI

Basés sur **shadcn/ui** avec personnalisations :
- 50+ composants accessibles
- Support mode sombre
- Animations fluides
- Responsive par défaut

---

## 📈 Étapes de Conception

### Phase 1 : Analyse & Conception
1. Identification des besoins utilisateurs
2. Définition des user stories
3. Conception du modèle de données
4. Maquettes UI/UX

### Phase 2 : Setup Technique
1. Initialisation projet Vite + React
2. Configuration Tailwind + shadcn/ui
3. Création projet Supabase
4. Configuration des tables et RLS

### Phase 3 : Développement Core
1. Système d'authentification custom
2. Dashboards étudiant/recruteur
3. CRUD profils et offres
4. Système de candidatures

### Phase 4 : Fonctionnalités Avancées
1. Upload de fichiers (CV)
2. Edge Functions pour emails
3. Recherche et filtres
4. Notifications temps réel

### Phase 5 : Polish & Optimisation
1. Responsive design
2. Gestion des erreurs
3. UX améliorations
4. Tests et debugging

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### Processus

1. **Fork** le repository
2. **Créer** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** sur la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines

- Respecter la structure existante
- Utiliser TypeScript avec typage strict
- Suivre les conventions de nommage
- Documenter les nouvelles fonctionnalités
- Tester avant de soumettre

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👏 Remerciements

- [React](https://react.dev/) - Framework UI
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

<div align="center">

**Développé avec ❤️ pour connecter les talents de demain**

[By KENFACK Durel](#-stageconnect---plateforme-de-mise-en-relation-étudiants-recruteurs)

</div>
