import {
  isValidEmail,
  isValidPassword,
  isValidPhone
} from "./helper";
import _ from "lodash";
import dayjs from "dayjs";


export const isValidate = (data, type, errors) => {
  let error = false
  let dataError = _.cloneDeep(errors);

  switch (type) {
    case 'username':
      if (data.username.length === 0) {
        dataError.username = 'Không được để trống trường này!';
        error = true;
      }
      // } else if (data.username.length < 6 || data.username.length > 20) {
      //   dataError.username = 'Độ dài tối thiểu cho phép: 6 ký tự và tối đa: 20 ký tự';
      //   error = true;
      // } 
      else {
        dataError.username = '';
      }
      break;
    case 'fullName':
      if (data.fullName.length === 0) {
        dataError.fullName = 'Không được để trống trường này!';
        error = true;
      } else if (data.fullName.length > 200) {
        dataError.fullName = 'Tên không được dài quá 200 ký tự';
        error = true;
      } else {
        dataError.fullName = '';
      }
      break;
    case 'email':
      if (data.email.length === 0) {
        dataError.email = 'Không được để trống trường này!';
        error = true;
      } else if (!isValidEmail(data.email)) {
        dataError.email = 'Email không hợp lệ';
        error = true;
      } else if (data.email.length > 200) {
        dataError.email = 'Độ dài tối đa cho phép: 200 ký tự';
        error = true;
      } else {
        dataError.email = '';
      }
      break;
    case 'phone':
      if (data.phone.length === 0) {
        dataError.phone = 'Không được để trống trường này!';
        error = true;
      } else if (!isValidPhone(data.phone)) {
        dataError.phone = 'Số điện thoại không hợp lệ';
        error = true;
      } else if (data.phone.length > 200) {
        dataError.phone = 'Độ dài tối đa cho phép: 200 ký tự';
        error = true;
      } else {
        dataError.phone = '';
      }
      break;
    case 'address':
      if (data.address.length === 0) {
        dataError.address = 'Không được để trống trường này!';
        error = true;
      } else if (data.address.length > 500) {
        dataError.address = 'Maximum number of characters allowed: 500';
        error = true;
      } else {
        dataError.address = '';
      }
      break;
    case 'currentPassword':
      if (data.currentPassword.length === 0) {
        dataError.currentPassword = 'Không được để trống trường này!';
        error = true;
      } else if (!isValidPassword(data.currentPassword)) {
        dataError.currentPassword = "Mật khẩu phải có ít nhất 6 ký tự và tối đa 50 ký tự, bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt."
        error = true
      } else {
        dataError.currentPassword = '';
      }
      break;
    case 'password':
      if (data.password.length === 0) {
        dataError.password = 'Không được để trống trường này!';
        error = true;
      } else if (!isValidPassword(data.password)) {
        dataError.password = "Mật khẩu phải có ít nhất 6 ký tự và tối đa 50 ký tự, bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt."
        error = true
      } else {
        dataError.password = '';
      }
      break;
    case 'confirmPassword':
      if (data.confirmPassword.length === 0) {
        dataError.confirmPassword = 'Không được để trống trường này!';
        error = true;
      } else if (data.password && data.confirmPassword !== data.password) {
        dataError.confirmPassword = 'Mật khẩu không khớp';
        error = true
      } else {
        dataError.confirmPassword = '';
      }
      break;
    case 'dob':
      if (!data.dob) {
        dataError.dob = 'Không được để trống trường này!';
        error = true;
      } else if (dayjs(data.dob).isAfter(dayjs())) {
        dataError.dob = 'Ngày sinh phải nhỏ hơn ngày hiện tại!';
        error = true;
      } else {
        dataError.dob = '';
      }
      break;
    case 'role':
      if (data.role.length === 0) {
        dataError.role = 'Không được để trống trường này!';
        error = true;
      } else {
        dataError.role = '';
      }
      break;

    case 'title':
      if (!data.title || data.title.trim().length === 0) {
        dataError.title = 'Không được để trống trường này!';
        error = true;
      } else if (data.title.length > 200) {
        dataError.title = 'Tiêu đề không được dài quá 200 ký tự';
        error = true;
      } else {
        dataError.title = '';
      }
      break;

    case 'content':
      if (!data.content || data.content.trim().length === 0) {
        dataError.content = 'Không được để trống trường này!';
        error = true;
      } else {
        dataError.content = '';
      }
      break;

    case 'categoryId':
      if (!data.categoryId) {
        dataError.categoryId = 'Không được để trống trường này!';
        error = true;
      } else {
        dataError.categoryId = '';
      }
      break;
  }

  return {
    isError: error,
    error: dataError,
  }
}