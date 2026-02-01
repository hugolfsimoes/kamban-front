export interface CardDTO {
  id: string;
  title: string;
  description: string;
  position: number;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  columnId?: string;
}
