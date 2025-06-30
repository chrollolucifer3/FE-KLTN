import {
    createSlice
} from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        reportDetail: {},
        paginationListReport: {
            currentPage: 1,
            perPage: 10,
            totalPage: 1,
            totalRecord: 0,
        },
        isLoadingTableReport: false,
        isLoadingModalReportDetail: false,
    },
    reducers: {
        getListReport: (state) => ({
            ...state,
            isLoadingTableReport: true,
        }),
        getListReportSuccess: (state, action) => ({
            ...state,
            isLoadingTableReport: false,
            reports: action.payload.result.reports,
            paginationListReport: {
                currentPage: action.payload.result.page,
                perPage: action.payload.result.size,
                totalPage: action.payload.result.totalPages,
                totalRecord: action.payload.result.total,
            },
        }),
        getListReportFail: (state) => ({
            ...state,
            isLoadingTableReport: false,
        }),
        getReportDetail: (state) => ({
            ...state,
            reportDetail: {},
            isLoadingModalReportDetail: true,
        }),
        getReportDetailSuccess: (state, action) => ({
            ...state,
            reportDetail: action.payload.result,
            isLoadingModalReportDetail: false,
        }),
        getReportDetailFail: (state) => ({
            ...state,
            reportDetail: {},
            isLoadingModalReportDetail: false,
        }),
        deleteCommentOrPost: (state) => ({
            ...state,
        }),
        deleteCommentOrPostSuccess: (state) => ({
            ...state,
        }),
        deleteCommentOrPostFail: (state) => ({
            ...state,
        }),
    }
})

export const {
    getListReport,
    getListReportSuccess,
    getListReportFail,
    getReportDetail,
    getReportDetailSuccess,
    getReportDetailFail,
    deleteCommentOrPost,
    deleteCommentOrPostSuccess,
    deleteCommentOrPostFail,
} = reportSlice.actions

export default reportSlice.reducer;