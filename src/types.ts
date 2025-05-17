export interface News {
  id: number
  title: string
  content: string
  imageUrl: string
}

export interface Finance {
  id: number
  category: string
  price: number
}

export interface Weather {
  id: number
  date: string
  description: string
  temperature: number
}

export interface History {
  title: string
}
