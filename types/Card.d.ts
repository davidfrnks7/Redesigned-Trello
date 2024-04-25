interface Tag {
  id: string;
  name: string;
  color: string;
}

interface ChecklistItem {
  id: IdleDeadline;
  name: string;
  completed: boolean;
}

interface CardComment {
  id: string;
  message: string;
  creationDate: Date;
  updatedDate: Date;
}

interface TableCard {
  id: string;
  title: string;
  description: string;
  complexity: Complexity | null;
  tags: Tag[];
  plannedDueDate: Date | null;
  checklist: ChecklistItem[];
  activity: CardComment[];
  order: number;
  completed: boolean;
  creationDate: string;
  updatedDate: string;
}
