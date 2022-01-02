import * as yup from 'yup';

type FormValues = {
    id: string;
    is_paid: boolean;
    is_cancelled: boolean;
    is_extra: boolean;
    observation: string;
};

const initialValues = {
    id: '',
    is_paid: false,
    is_cancelled: false,
    is_extra: false,
    observation: '',
};

const validationSchema = yup.object().shape({
    id: yup.string(),
    is_paid: yup.boolean(),
    is_cancelled: yup.boolean(),
    is_extra: yup.boolean(),
    observation: yup.string(),
});

export type { FormValues };
export { initialValues, validationSchema };
