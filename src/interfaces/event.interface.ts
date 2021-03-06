export interface IEvent {
    _id?: string
    title: string
    date: string | Date
    location: string
    shortDescription: string
    fullDescription: string
    secureUrl: string
    imageId: string
    status: string
}
