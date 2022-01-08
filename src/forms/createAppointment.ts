import * as yup from 'yup';

type FormValues = {
    id: string;
    id_student: string;
    id_cost: string;
    cost: {
        id: string;
        time: string;
        price: string;
    };
    date: string;
    is_extra: boolean;
    is_paid: boolean;
};

const initialValues = {
    id: '',
    id_student: '',
    id_cost: '',
    cost: {
        id: '',
        time: '',
        price: '',
    },
    date: '',
    is_extra: true,
    is_paid: false,
};

const validationSchema = yup.object().shape({
    id_student: yup.string().required('Esse campo é obrigatório'),
    id_cost: yup.string().required('Esse campo é obrigatório'),
    cost: yup.object().shape({
        id: yup.string().required('Esse campo é obrigatório'),
        time: yup.string(),
        price: yup.string(),
    }),
    date: yup.string().required('Esse campo é obrigatório'),
    is_extra: yup.boolean(),
    is_paid: yup.boolean(),
});

export type { FormValues };
export { initialValues, validationSchema };
