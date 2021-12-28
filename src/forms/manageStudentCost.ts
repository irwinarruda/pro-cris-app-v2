import * as yup from 'yup';

type FormValues = {
    time: string;
    price: string;
    is_default: boolean;
    is_deleted: boolean;
};

const initialValues = {
    time: '',
    price: '',
    is_default: false,
    is_deleted: false,
};

const validationSchema = yup.object().shape({
    time: yup.string().required('Esse campo é obrigatório'),
    price: yup.string().required('Esse campo é obrigatório'),
});

export type { FormValues };
export { initialValues, validationSchema };
