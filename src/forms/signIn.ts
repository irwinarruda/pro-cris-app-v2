import * as yup from 'yup';

type FormValues = {
    email: string;
    password: string;
};

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Esse campo deve ser preenchido')
        .email('Deve ser um email válido'),
    password: yup.string().required('Esse campo deve ser preenchido'),
});

export type { FormValues };
export { initialValues, validationSchema };
