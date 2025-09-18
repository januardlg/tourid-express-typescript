export interface BlogDataDTO {
    blog_id: number,
    title: string,
    blog: string,
    images: string | null,
    created_at: Date,
    updated_at: Date,
    author: any
}
