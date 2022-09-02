export interface GetRussianCitiesResponse {
    results: RussianCity[]
}

export interface RussianCity {
    objectId: string,
    name: string,
    createdAt: string,
    updatedAt: string
}