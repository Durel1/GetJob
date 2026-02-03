
interface CandidatureStatusBadgeProps {
  status: string | null;
}

export const CandidatureStatusBadge = ({ status }: CandidatureStatusBadgeProps) => {
  const getStatusColor = (status: string | null) => {
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

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};
