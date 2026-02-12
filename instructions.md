## Test Technique : Dashboard de Documents Notariés (Klaire)

**Contexte**
Chez Klaire, nous traitons des milliers d'actes notariés. Ton objectif est de créer une mini-application Full Stack permettant de suivre l'état de ces documents.

**Durée indicative : 2h**
> **Important :** Ce n'est pas grave si tu ne termines pas tout. Nous ne jugeons pas la quantité, mais la **qualité** de ce que tu produis (propreté du code, typage, architecture).
> Fais un backend propre et une interface simple mais fonctionnelle.

**Stack Technique**
*   **Backend :** NestJS + TypeORM + SQLite.
*   **Frontend :** React + Vite + TypeScript.

---

### 1. Backend (NestJS)

Tu dois créer une API REST pour gérer des documents.

#### A. L'Entité `Document`
Crée une entité avec ces champs :

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Clé primaire auto-incrémentée. |
| `fileName` | String | Nom du fichier (ex: "acte_vente.pdf"). |
| `status` | Enum/String | Valeurs : `PENDING`, `PROCESSED`, `ARCHIVED`. (Défaut: `PENDING`). |
| `pageCount` | Number | Nombre de pages du document. |
| `metadata` | JSON | Objet stockant des infos extraites (ex: auteur, date). |
| `createdAt` | Date | Date de création automatique. |

#### B. Les Endpoints API

**Note :** Pour ce test, **il n'est pas nécessaire de gérer l'upload binaire du fichier**. On simule l'upload en envoyant juste le nom du fichier.

1.  **`POST /documents`**
    *   Permet de créer un document.
    *   **Validation :** Le `pageCount` doit être un entier positif.
    *   **Payload :** `{ "fileName": "test.pdf", "pageCount": 12, "metadata": {...} }`
2.  **`GET /documents`**
    *   Renvoie la liste de tous les documents, triés du plus récent au plus ancien.
3.  **`PATCH /documents/:id`**
    *   Permet de mettre à jour uniquement le `status` d'un document.
4.  **`GET /documents/stats`** (Challenge)
    *   Renvoie la **somme totale** de `pageCount` groupée par `status`.
    *   **Contrainte :** Le calcul doit être fait via une **requête SQL / QueryBuilder** (pas de calcul Javascript après récupération).
    *   **Exemple de retour :** `[{ "status": "PENDING", "total_pages": 45 }, ...]`

---

### 2. Frontend (React + Vite + TypeScript)

L'interface peut être minimaliste (CSS brut ou librairie au choix).

#### A. Page Dashboard
1.  **Formulaire d'ajout :**
    *   Champs : Nom du fichier (texte), Nombre de pages (nombre).
    *   Le champ `metadata` peut être envoyé vide ou codé en dur (ex: `{ source: "manual" }`) pour l'exercice.
2.  **Liste des documents :**
    *   Afficher : Nom, Statut (badge couleur), Nombre de pages.
    *   Action : Un moyen simple de changer le statut (bouton ou select).

#### B. Composant Statistiques
*   Affiche en haut de page le résultat de l'endpoint `/stats`.
*   Exemple : "En attente : 45 pages | Traité : 120 pages".

---

### 3. Livrables
Un dépôt Git (GitHub/GitLab) public contenant :
1.  Le dossier Backend.
2.  Le dossier Frontend.
3.  Un `README.md` expliquant comment lancer le projet.