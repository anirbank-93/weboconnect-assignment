export interface PostDataModel {
    id: number;
    pictures?: string;
    user_id: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    tags: string;
    title: string;
    message: string;
    likeCount?: number;
}

export interface PostListDataModel {
    data: Array<PostDataModel>;
    // meta: {
    //   pagination: PaginationInfo;
    // };
  }