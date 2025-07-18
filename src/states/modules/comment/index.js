import {
    createSlice
} from "@reduxjs/toolkit";
// import { update } from "lodash";

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        commentInMonth: 0,
        paginationListCommentFromPost: {
            currentPage: 1,
            perPage: 10,
            totalPage: 1,
            totalRecord: 0,
        },
        isLoadingComment: false,
        isLoadingBtnCreateComment: false,
    },
    reducers: {
        getListComment: (state) => ({
            ...state,
            isLoadingComment: true,
        }),
        getListCommentSuccess: (state, action) => ({
            ...state,
            isLoadingComment: false,
            comments: action.payload.result.comments,
            paginationListCommentFromPost: {
                currentPage: action.payload.result.page,
                perPage: action.payload.result.size,
                totalPage: action.payload.result.totalPages,
                totalRecord: action.payload.result.total,
            },
        }),
        getListCommentFail: (state) => ({
            ...state,
            isLoadingComment: false,
        }),
        createComment: (state) => ({
            ...state,
            isLoadingBtnCreateComment: true,
        }),
        createCommentSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateComment: false,
        }),
        createCommentFail: (state) => ({
            ...state,
            isLoadingBtnCreateComment: false,
        }),
        updateComment: (state) => ({
            ...state,
        }),
        updateCommentSuccess: (state) => ({
            ...state,
        }),
        updateCommentFail: (state) => ({
            ...state,
        }),
        deleteComment: (state) => ({
            ...state,
        }),
        deleteCommentSuccess: (state) => ({
            ...state,
        }),
        deleteCommentFail: (state) => ({
            ...state,
        }),
        getCommentInMonth: (state) => ({
            ...state,
            commentInMonth: 0
        }),
        getCommentInMonthSuccess: (state, action) => ({
            ...state,
            commentInMonth: action.payload.result
        }),
        getCommentInMonthFail: (state) => ({
            ...state,
            commentInMonth: 0
        }),
    }
})

export const {
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
} = commentSlice.actions

export default commentSlice.reducer;