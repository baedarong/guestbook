export interface INote {
  id?: string
  attachmentURL: string
  createdAt: number
  creatorId: string
  isAdmin?: boolean
  text: string
}
