import callApi from "api/callApi";

import {
  createPost,
  createPostSuccess,
  createPostFail,
  getListPost,
  getListPostSuccess,
  getListPostFail,
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
  getPostsByUserId,
  getPostsByUserIdSuccess,
  getPostsByUserIdFail,
  getUpdatePost,
  updatePostSuccess,
  updatePostFail,
  getPostsLikeByUser,
  getPostsLikeByUserSuccess,
  getPostsLikeByUserFail,
} from "states/modules/post/index";
import {
  getListComment,
  getListCommentSuccess,
  getListCommentFail,
  createComment,
  createCommentSuccess,
  createCommentFail,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFail,
  getCommentInMonth,
  getCommentInMonthSuccess,
  getCommentInMonthFail,
  updateComment,
  updateCommentSuccess,
  updateCommentFail
} from "states/modules/comment/index";

export const handleCreatePost = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `post`,
    actionTypes: [createPost, createPostSuccess, createPostFail],
    variables: data,
    dispatch,
    getState,
  });
}

export const uploadImage = (formData) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `upload`,
    actionTypes: [createPost, createPostSuccess, createPostFail],
    variables: formData,
    dispatch,
    getState,
  });
}

export const getAllPost = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `post/getAll?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.status && dataFilter.status.length > 0) {
    path += `&status=${dataFilter.status}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListPost, getListPostSuccess, getListPostFail],
    variables: {},
    dispatch,
    getState,
  })
}

// get all post for client
export const getAllPostForClient = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `post/getAllForClient?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListPost, getListPostSuccess, getListPostFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const getPost = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `post/${id}`,
    actionTypes: [getDetailPost, getDetailPostSuccess, getDetailPostFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const approvePost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `post/approve`,
    actionTypes: [getApprovePost, approvePostSuccess, approvePostFail],
    variables: data,
    dispatch,
    getState,
    role: 'admin'
  })
}


export const rejectPost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `post/reject`,
    actionTypes: [getRejectPost, rejectPostSuccess, rejectPostFail],
    variables: data,
    dispatch,
    getState,
    role: 'admin'
  })
}

export const getPostFromCategoryId = (categoryId, dataFilter = {
  perPage: 10,
  page: 1,
}) => async (dispatch, getState) => {
  let path = `post/category/${categoryId}?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getPostsFromCategory, getPostsFromCategorySuccess, getPostsFromCategoryFail], // Nếu bạn muốn dispatch trạng thái loading/success/fail thì thêm action types vào đây
    variables: {},
    dispatch,
    getState,
  });
};

// like post
export const postLike = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `post/like`,
    actionTypes: [getLikePostOrUnlikePost, likePostOrUnlikeSuccess, likePostOrUnlikeFail],
    variables: data,
    dispatch,
    getState,
  })
}

// comment post
export const getCommentsFromPost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `comment/getList/${data.postId}?page=${data.page}&size=${data.size}`,
    actionTypes: [getListComment, getListCommentSuccess, getListCommentFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const createCommentForPost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `comment`,
    actionTypes: [createComment, createCommentSuccess, createCommentFail],
    variables: data,
    dispatch,
    getState,
  })
}

export const getNewPost = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `post/getPost`,
    actionTypes: [getFivePost, getFivePostSuccess, getFivePostFail],
    variables: {},
    dispatch,
    getState,
  })
}

export const deleteCommentById = (commentId) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: 'comment/delete',
    actionTypes: [deleteComment, deleteCommentSuccess, deleteCommentFail],
    variables: commentId,
    dispatch,
    getState,
  })
}

export const reportComment = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: 'report',
    actionTypes: [deleteComment, deleteCommentSuccess, deleteCommentFail],
    variables: data,
    dispatch,
    getState,
  })
}

// lấy số lượng bài viết trong tháng hiện tại
export const getCountPostInCurrentMonth = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'post/get/count-posts-this-month',
    actionTypes: [getCountPostInMonth,
      getCountPostInMonthSuccess,
      getCountPostInMonthFail
    ],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const getCountCommentInCurrentMonth = () => async (dispatch, getState) => {

  return callApi({
    method: 'get',
    apiPath: 'comment/count',
    actionTypes: [getCommentInMonth,
      getCommentInMonthSuccess,
      getCommentInMonthFail
    ],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const getPostsInMonthRange = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: 'post/get/count-posts-by-time',
    actionTypes: [getPostsInRange,
      getPostsInRangeSuccess,
      getPostsInRangeFail,
    ],
    variables: data,
    dispatch,
    getState,
  })
}

export const getTopFivePostsMostLikedInCurrentMonth = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'post/get/top-liked-month',
    actionTypes: [getTopFivePostsMostLiked,
      getTopFivePostsMostLikedSuccess,
      getTopFivePostsMostLikedFail,
    ],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const getPostByUser = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `post/user?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${encodeURIComponent(dataFilter.keySearch)}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  if (dataFilter.status) {
    path += `&status=${dataFilter.status}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getPostsByUser, getPostsByUserSuccess, getPostsByUserFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const deletePost = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `post/delete/${id}`,
    actionTypes: [deletePostSuccess,
      getDeletePost,
      deletePostFail,
    ],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  });
}

export const getPostsByUserIdForClient = (userId, dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `post/user/${userId}?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getPostsByUserId,
      getPostsByUserIdSuccess,
      getPostsByUserIdFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const updatePost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `post/update`,
    actionTypes: [getUpdatePost,
      updatePostSuccess,
      updatePostFail,
    ],
    variables: data,
    dispatch,
    getState,
  })
}

export const getPostsLike = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `post/liked?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getPostsLikeByUser, getPostsLikeByUserSuccess, getPostsLikeByUserFail],
    variables: {},
    dispatch,
    getState,
  });
}

export const updateCommentPost = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `comment/update`,
    actionTypes: [updateComment,
      updateCommentSuccess,
      updateCommentFail
    ],
    variables: data,
    dispatch,
    getState,
  });
}