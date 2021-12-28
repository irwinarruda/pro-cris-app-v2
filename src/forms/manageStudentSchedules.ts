import * as yup from 'yup';

type FormValues = {
    id?: string;
    week_day: string;
    day_time: string;
    is_default: boolean;
    is_deleted: boolean;
};

const initialValues = {
    id: '',
    week_day: '',
    day_time: '',
    is_default: true,
    is_deleted: false,
};

const validationSchema = yup.object().shape({
    week_day: yup.string().required('Esse campo é obrigatório'),
    day_time: yup.string().required('Esse campo é obrigatório'),
});

export type { FormValues };
export { initialValues, validationSchema };
