import {
  createSlice
} from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    postsFromUser: [],
    categoryName: '',
    postDetail: {},
    top5Posts: [],
    postsFromCategory: [],
    postLike: [],
    newPost: [],
    myPost: [],
    countPostInMonth: 0,
    postInRange: [],
    isLoadingListPost: false,
    isLoadingListMyPost: false,
    isLoadingTableMostLiked: false,
    isLoadingPostFromUser: false,
    isLoadingPostLikeByUser: false,
    paginationListPostFromUser: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    paginationListPostLikeByUser: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    paginationListPostFromCategory: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    isLoadingTablePost: false,
    paginationListPost: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    paginationListMyPost: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    errorCreatePost: {
      title: '',
      content: '',
    },
    isLoadingBtnCreatePost: false,
    visibleModalDetailPost: false,
    visibleModalApprovePost: false,
    visibleModalRejectPost: false,
    visibleModalDeletePost: false,
  },
  reducers: {
    setVisibleModalRejectPost: (state, action) => ({
      ...state,
      visibleModalRejectPost: action.payload
    }),
    setVisibleModalDetailPost: (state, action) => ({
      ...state,
      visibleModalDetailPost: action.payload
    }),
    setVisibleModalApprovePost: (state, action) => ({
      ...state,
      visibleModalApprovePost: action.payload
    }),
    setErrorCreatePost: (state, action) => ({
      ...state,
      errorCreatePost: action.payload
    }),
    createPost: (state) => ({
      ...state,
      isLoadingBtnCreatePost: true,
    }),
    createPostSuccess: (state) => ({
      ...state,
      isLoadingBtnCreatePost: false,
    }),
    createPostFail: (state) => ({
      ...state,
      isLoadingBtnCreatePost: false,
    }),
    getListPost: (state) => ({
      ...state,
      posts: [],
      isLoadingTablePost: true
    }),
    getListPostSuccess: (state, action) => ({
      ...state,
      isLoadingTablePost: false,
      posts: action.payload.result.posts,
      paginationListPost: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListPostFail: (state) => ({
      ...state,
      posts: [],
      isLoadingTablePost: false
    }),
    getPostsLikeByUser: (state) => ({
      ...state,
      postLike: [],
      isLoadingPostLikeByUser: true,
    }),
    getPostsLikeByUserSuccess: (state, action) => ({
      ...state,
      postLike: action.payload.result.posts,
      paginationListPostLikeByUser: {   
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
      isLoadingPostLikeByUser: false,
    }),
    getPostsLikeByUserFail: (state) => ({
      ...state,
      postLike: [],
      isLoadingPostLikeByUser: false,
    }),
    getDetailPost: (state) => ({
      ...state,
    }),
    getDetailPostSuccess: (state, action) => ({
      ...state,
      postDetail: action.payload.result,
    }),
    getDetailPostFail: (state) => ({
      ...state,
      postDetail: {},
    }),
    getApprovePost: (state) => ({
      ...state,
    }),
    approvePostSuccess: (state) => ({
      ...state,
    }),
    approvePostFail: (state) => ({
      ...state,
    }),
    getRejectPost: (state) => ({
      ...state,
    }),
    rejectPostSuccess: (state) => ({
      ...state,
    }),
    rejectPostFail: (state) => ({
      ...state,
    }),
    getPostsFromCategory: (state) => ({
      ...state,
      postsFromCategory: [],
      categoryName: '',
      isLoadingListPost: true
    }),
    getPostsFromCategorySuccess: (state, action) => ({
      ...state,
      isLoadingListPost: false,
      postsFromCategory: action.payload.result.posts,
      categoryName: action.payload.result.categoryName,
      paginationListPostFromCategory: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getPostsFromCategoryFail: (state) => ({
      ...state,
      postsFromCategory: [],
      categoryName: '',
      isLoadingListPost: false
    }),
    getLikePostOrUnlikePost: (state) => ({
      ...state,
    }),
    likePostOrUnlikeSuccess: (state) => ({
      ...state,
    }),
    likePostOrUnlikeFail: (state) => ({
      ...state,
    }),
    getFivePost: (state) => ({
      ...state,
      newPost: [],
    }),
    getFivePostSuccess: (state, action) => ({
      ...state,
      newPost: action.payload.result,
    }),
    getFivePostFail: (state) => ({
      ...state,
      newPost: [],
    }),
    getCountPostInMonth: (state) => ({
      ...state,
      countPostInMonth: 0,
    }),
    getCountPostInMonthSuccess: (state, action) => ({
      ...state,
      countPostInMonth: action.payload.result,
    }),
    getCountPostInMonthFail: (state) => ({
      ...state,
      countPostInMonth: 0,
    }),
    getPostsInRange: (state) => ({
      ...state,
      postInRange: [],
    }),
    getPostsInRangeSuccess: (state, action) => ({
      ...state,
      postInRange: action.payload.result,
    }),
    getPostsInRangeFail: (state) => ({
      ...state,
      postInRange: [],
    }),
    getTopFivePostsMostLiked: (state) => ({
      ...state,
      top5Posts: [],
      isLoadingTableMostLiked: true,
    }),
    getTopFivePostsMostLikedSuccess: (state, action) => ({
      ...state,
      top5Posts: action.payload.result.posts,
      isLoadingTableMostLiked: false,
    }),
    getTopFivePostsMostLikedFail: (state) => ({
      ...state,
      top5Posts: [],
      isLoadingTableMostLiked: false,
    }),
    getPostsByUser: (state) => ({
      ...state,
      myPost: [],
      isLoadingListMyPost: true,
    }),
    getPostsByUserSuccess: (state, action) => ({
      ...state,
      myPost: action.payload.result.posts,
      paginationListMyPost: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
      isLoadingListMyPost: false,
    }),
    getPostsByUserFail: (state) => ({
      ...state,
      myPost: [],
      isLoadingListMyPost: false,
    }),
    getDeletePost: (state) => ({
      ...state,
    }),
    deletePostSuccess: (state) => ({
      ...state,
    }),
    deletePostFail: (state) => ({
      ...state,
    }),
    setVisibleModalDeletePost: (state, action) => ({
      ...state,
      visibleModalDeletePost: action.payload
    }),
    getPostsByUserId: (state) => ({
      ...state,
      postsFromUser: [],
      isLoadingPostFromUser: true,
    }),
    getPostsByUserIdSuccess: (state, action) => ({
      ...state,
      postsFromUser: action.payload.result.posts,
      paginationListPostFromUser: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,      
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
      isLoadingPostFromUser: false,
    }),
    getPostsByUserIdFail: (state) => ({
      ...state,
      postsFromUser: [],
      isLoadingPostFromUser: false,
    }),
    getUpdatePost: (state) => ({
      ...state,
    }),
    updatePostSuccess: (state) => ({
      ...state,
    }),
    updatePostFail: (state) => ({
      ...state,
    }),
  }
})

export const {
  createPost,
  createPostSuccess,
  createPostFail,
  setErrorCreatePost,
  getListPost,
  getListPostSuccess,
  getListPostFail,
  setVisibleModalDetailPost,
  setVisibleModalApprovePost,
  setVisibleModalRejectPost,
  getDetailPost,
  getDetailPostSuccess,
  getDetailPostFail,
  getApprovePost,
  approvePostSuccess,
  approvePostFail,
  getRejectPost,
  rejectPostSuccess,
  rejectPostFail,
  getPostsFromCategory,
  getPostsFromCategorySuccess,
  getPostsFromCategoryFail,
  getLikePostOrUnlikePost,
  likePostOrUnlikeSuccess,
  likePostOrUnlikeFail,
  getFivePost,
  getFivePostSuccess,
  getFivePostFail,
  getCountPostInMonth,
  getCountPostInMonthSuccess,
  getCountPostInMonthFail,
  getPostsInRange,
  getPostsInRangeSuccess,
  getPostsInRangeFail,
  getTopFivePostsMostLiked,
  getTopFivePostsMostLikedSuccess,
  getTopFivePostsMostLikedFail,
  getPostsByUser,
  getPostsByUserSuccess,
  getPostsByUserFail,
  deletePostSuccess,
  getDeletePost,
  deletePostFail,
  setVisibleModalDeletePost,
  getPostsByUserId,
  getPostsByUserIdSuccess,
  getPostsByUserIdFail,
  getUpdatePost,
  updatePostSuccess,
  updatePostFail,
  getPostsLikeByUser,
  getPostsLikeByUserSuccess,
  getPostsLikeByUserFail,
} = postSlice.actions

export default postSlice.reducer;