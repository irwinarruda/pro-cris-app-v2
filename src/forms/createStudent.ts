import * as yup from 'yup';

import { Schedule } from 'app/entities/Schedule';
import { Cost } from 'app/entities/Cost';

type FormValues = {
    name: string;
    name_caregiver: string;
    phone: string;
    avatar: string;
    date_of_birth: string;
    address: string;
    map_location: string;
    observation: string;
    schedule: Schedule[];
    cost: Cost[];
};

const initialValues = {
    name: '',
    name_caregiver: '',
    phone: '',
    avatar: '',
    date_of_birth: '',
    address: '',
    map_location: '',
    observation: '',
    schedule: [] as Schedule[],
    cost: [] as Cost[],
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Esse campo é obrigatório'),
    name_caregiver: yup.string().required('Esse campo é obrigatório'),
    phone: yup.string().required('Esse campo é obrigatório'),
    avatar: yup.string(),
    date_of_birth: yup.string(),
    address: yup.string(),
    map_location: yup.string(),
    observation: yup.string(),
});

export type { FormValues };
export { initialValues, validationSchema };
