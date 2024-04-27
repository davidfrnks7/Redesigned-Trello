interface CardTag {
  id: string;
  cardId: string;
  name: string;
  color: string;
}

interface CardChecklistItem {
  id: IdleDeadline;
  cardId: string;
  name: string;
  completed: boolean;
}

interface CardComment {
  id: string;
  cardId: string;
  message: string;
  creationDate: Date;
  updatedDate: Date;
}

interface TableCard {
  id: string;
  tableId: string;
  title: string;
  description: string;
  complexity: Complexity | null;
  tags: CardTag[];
  plannedDueDate: string | null;
  checklist: CardChecklistItem[];
  activity: CardComment[];
  order: number;
  completed: boolean;
  creationDate: string;
  updatedDate: string;
}
