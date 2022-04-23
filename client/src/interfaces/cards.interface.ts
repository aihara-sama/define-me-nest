export interface ICard {
  title: string;
  description: string;
  imageName: string;
  category: string;
  id: string;
  // links: string[];
}

export type TDraftCreateCard = Omit<ICard, 'id'>;
export type TDraftEditCard = ICard;
