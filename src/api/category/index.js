import callApi from "api/callApi";

import {
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
} from "states/modules/category/index";

export const getCategorySub = () => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `category/sub`,
        actionTypes: [getCategoriesSub, getCategoriesSubSuccess, getCategoriesSubFail],
        variables: {},
        dispatch,
        getState,
    });
}

export const getAllCategoryPost = () => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `category/all`,
        actionTypes: [getAllCategoryAndPost, getAllCategoryAndPostSuccess, getAllCategoryAndPostFail],
        variables: {},
        dispatch,
        getState,
    });
}

export const getListCategorySubById = (id) => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `category/${id}`,
        actionTypes: [getCategoryById, getCategoryByIdSuccess, getCategoryByIdFail],
        variables: {},
        dispatch,
        getState,
    });
}

export const getAllCategories = () => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `category/getAll`,
        actionTypes: [getAllCategory,
            getAllCategorySuccess,
            getAllCategoryFail
        ],
        variables: {},
        dispatch,
        getState,
    });
}

export const getAllCategoryParentForAdmin = () => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `category`,
        actionTypes: [getAllCategoryParent, getAllCategoryParentSuccess, getAllCategoryParentFail],
        variables: {},
        dispatch,
        getState,
    });
}

export const createCategoryParentForAdmin = (data) => async (dispatch, getState) => {
    return callApi({
        method: "post",
        apiPath: `category`,
        actionTypes: [createCategoryParent, createCategoryParentSuccess, createCategoryParentFail],
        variables: data,
        dispatch,
        getState,
    });
}

export const createCategorySubForAdmin = (data) => async (dispatch, getState) => {
    return callApi({
        method: "post",
        apiPath: `category/child`,
        actionTypes: [createCategorySub, createCategorySubSuccess, createCategorySubFail],
        variables: data,
        dispatch,
        getState,
    });
}

export const updateCategoryForAdmin = (data) => async (dispatch, getState) => {
    return callApi({
        method: "post",
        apiPath: `category/update/${data.id}`,
        actionTypes: [updateCategory,
            updateCategorySuccess,
            updateCategoryFail
        ],
        variables: data,
        dispatch,
        getState,
    });
}