export interface BlogInfoInterface {
    _id:string,
    title:string,
    content:string,
    username:string,
    isapproved:string,
    createdAt?: Date // Optional field for created date
}
