import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Định dạng Email không hợp lệ')
        .required('Email không được để trống'),
    password: Yup.string()
        .required('Password không được để trống'),
});

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name không được để trống'),
    email: Yup.string()
        .email('Định dạng Email không hợp lệ')
        .required('Email không được để trống'),
    password: Yup.string()
        .min(6, 'Password phải có ít nhất 6 ký tự')
        .required('Password không được để trống'),
});