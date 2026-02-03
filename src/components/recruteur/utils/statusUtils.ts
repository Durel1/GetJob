
export const getStatusBadgeColor = (status: string | null) => {
  switch (status) {
    case "Accepté":
      return "bg-green-100 text-green-800";
    case "Refusé":
      return "bg-red-100 text-red-800";
    case "Attente de réponse":
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

export const getStatusText = (status: string | null) => {
  switch (status) {
    case "Accepté":
      return "Acceptée";
    case "Refusé":
      return "Refusée";
    case "Attente de réponse":
    default:
      return "En attente";
  }
};
