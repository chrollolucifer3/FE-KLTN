import {
  createSlice
} from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    documents: [],
    myDocuments: [],
    countByDocument: 0,
    isLoadingListDocument: false,
    isLoadingTableDocument: false,
    isLoadingTableMyListDocument: false,
    paginationListMyDocument: {
      currentPage: 1, 
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    paginationListDocument: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    visibleModalApprove: false,
    visibleModalReject: false,
  },
  reducers: {
    setVisibleModalApprove: (state, action) => ({
      ...state,
      visibleModalApprove: action.payload
    }),
    setVisibleModalReject: (state, action) => ({
      ...state,
      visibleModalReject: action.payload
    }),
    getListDocument: (state) => ({
      ...state,
        isLoadingListDocument: true,
        isLoadingTableDocument: true,
    }),
    getListDocumentSuccess: (state, action) => ({
      ...state,
      isLoadingTableDocument: false,
      documents: action.payload.result.documents,
      paginationListDocument: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListDocumentFail: (state) => ({
      ...state,
      isLoadingTableDocument: false,
    }),
    getListMyDocument: (state) => ({
      ...state,
      isLoadingTableMyListDocument: true,
    }),
    getListMyDocumentSuccess: (state, action) => ({
      ...state,
      isLoadingTableMyListDocument: false,
      myDocuments: action.payload.result.documents,
      paginationListMyDocument: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListMyDocumentFail: (state) => ({
      ...state,
      isLoadingTableMyListDocument: false,
    }),
    approveDocument: (state) => ({
      ...state,
    }),
    approveDocumentSuccess: (state) => ({
      ...state,
    }),
    approveDocumentFail: (state) => ({
      ...state,
    }),
    rejectDocument: (state) => ({
      ...state,
    }),
    rejectDocumentSuccess: (state) => ({
      ...state,
    }),
    rejectDocumentFail: (state) => ({
      ...state,
    }),
    getCountByDocument: (state) => ({
      ...state,
      countByDocument: 0,
    }),
    getCountDocumentSuccess: (state, action) => ({
      ...state,
      countByDocument: action.payload.result,
    }),
    getCountDocumentFail: (state) => ({
      ...state,
      countByDocument: 0,
    }),
    deleteDocument: (state) => ({
      ...state,
    }),
    deleteDocumentSuccess: (state) => ({
      ...state,
    }),
    deleteDocumentFail: (state) => ({
      ...state,
    }),
  }
})

export const {
    getListDocument,
    getListDocumentSuccess,
    getListDocumentFail,
    setVisibleModalApprove,
    setVisibleModalReject,
    approveDocument,
    approveDocumentSuccess,
    approveDocumentFail,
    rejectDocument,
    rejectDocumentSuccess,
    rejectDocumentFail,
    getCountByDocument,
    getCountDocumentSuccess,  
    getCountDocumentFail,
    getListMyDocument,
    getListMyDocumentSuccess,
    getListMyDocumentFail,
    deleteDocument,
    deleteDocumentSuccess,
    deleteDocumentFail,
} = documentSlice.actions

export default documentSlice.reducer;