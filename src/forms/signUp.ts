import * as yup from 'yup';

type FormValues = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Esse campo deve ser preenchido'),
    email: yup
        .string()
        .required('Esse campo deve ser preenchido')
        .email('Deve ser um email válido'),
    password: yup.string().required('Esse campo deve ser preenchido'),
    passwordConfirm: yup
        .string()
        .required('Esse campo deve ser preenchido')
        .oneOf([yup.ref('password'), null], 'Senhas deve ser iguais'),
});

export type { FormValues };
export { initialValues, validationSchema };
