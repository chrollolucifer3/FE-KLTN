import {
  createSlice
} from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    allCategories: [],
    categoryPost : [],
    categoryParent: [],
    listCategoryAndPost: [],
    isLoadingListCategory: false,
    isLoadingCategory: false,
  },
  reducers: {
    getCategoriesSub: (state) => ({
      ...state,
      categories: [],
    }),
    createCategoryParent: (state) => ({
      ...state, 
    }),
    createCategoryParentSuccess: (state) => ({
      ...state,
      }),
    createCategoryParentFail: (state) => ({
      ...state,
    }),
    createCategorySub: (state) => ({
      ...state,
    }),
    createCategorySubSuccess: (state) => ({
      ...state,
    }),
    createCategorySubFail: (state) => ({
      ...state,
    }),
    getCategoriesSubSuccess: (state, action) => ({
      ...state,
      categories: action.payload.result,
    }),
    getCategoriesSubFail: (state) => ({
      ...state,
      categories: [],
    }),
    getAllCategoryAndPost: (state) => ({
      ...state,
      categoryPost: [],
    }),
    getAllCategoryAndPostSuccess: (state, action) => ({
      ...state,
      categoryPost: action.payload.result,
    }),
    getAllCategoryAndPostFail: (state) => ({
      ...state,
      categoryPost: [],
    }),
    getCategoryById: (state) => ({
      ...state,
      listCategoryAndPost: [],
      isLoadingListCategory: true,
    }),
    getCategoryByIdSuccess: (state, action) => ({
      ...state,
      listCategoryAndPost: action.payload.result,
      isLoadingListCategory: false,
    }),
    getCategoryByIdFail: (state) => ({
      ...state,
      listCategoryAndPost: [],
      isLoadingListCategory: false,
    }),
    getAllCategory : (state) => ({
      ...state,
      allCategories: [],
      isLoadingCategory: true,
    }),
    getAllCategorySuccess: (state, action) => ({
      ...state,
      allCategories: action.payload.result,
      isLoadingCategory: false,
    }),
    getAllCategoryFail: (state) => ({
      ...state,
      allCategories: [],
      isLoadingCategory: false,
    }),
    getAllCategoryParent: (state) => ({
      ...state,
      categoryParent: [],
    }),
    getAllCategoryParentSuccess: (state, action) => ({
      ...state,
      categoryParent: action.payload.result,
    }),
    getAllCategoryParentFail: (state) => ({
      ...state,
      categoryParent: [],
    }),
    updateCategory: (state) => ({
      ...state,
    }),
    updateCategorySuccess: (state) => ({
      ...state,
    }),
    updateCategoryFail: (state) => ({
      ...state,
    }),
  }
})

export const {
    getCategoriesSub,
    getCategoriesSubSuccess,
    getCategoriesSubFail,
    getAllCategoryAndPost,
    getAllCategoryAndPostSuccess,
    getAllCategoryAndPostFail,
    getCategoryById,
    getCategoryByIdSuccess,
    getCategoryByIdFail,
    getAllCategory,
    getAllCategorySuccess,
    getAllCategoryFail,
    getAllCategoryParent,
    getAllCategoryParentSuccess,
    getAllCategoryParentFail,
    createCategoryParent,
    createCategoryParentSuccess,
    createCategoryParentFail,
    createCategorySub,
    createCategorySubSuccess,
    createCategorySubFail,
    updateCategory,
    updateCategorySuccess,
    updateCategoryFail
} = categorySlice.actions

export default categorySlice.reducer;