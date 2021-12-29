import * as yup from 'yup';

import { Schedule } from 'app/entities/Schedule';
import { Cost } from 'app/entities/Cost';
import { Colors } from 'app/entities/Colors';

type ImageInfo = {
    uri: string;
    width: number;
    height: number;
    type?: 'image' | 'video' | 'firebase';
    exif?: {
        [key: string]: any;
    };
    base64?: string;
};

type ImagePickerResult =
    | { cancelled: true }
    | ({ cancelled: false } & ImageInfo);

type FormValues = {
    id: string;
    name: string;
    name_caregiver: string;
    phone: string;
    avatar: ImagePickerResult;
    date_of_birth: string;
    address: string;
    map_location: string;
    observation: string;
    color: Colors;
    is_deleted: boolean;
    schedules: Schedule[];
    costs: Cost[];
};

const initialValues = {
    id: '',
    name: '',
    name_caregiver: '',
    phone: '',
    avatar: { cancelled: true } as ImagePickerResult,
    date_of_birth: '',
    address: '',
    map_location: '',
    observation: '',
    color: Colors.Green,
    is_deleted: false,
    schedules: [] as Schedule[],
    costs: [] as Cost[],
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Esse campo é obrigatório'),
    name_caregiver: yup.string().required('Esse campo é obrigatório'),
    phone: yup.string().required('Esse campo é obrigatório'),
    color: yup.string().required('Esse campo é obrigatório'),
    avatar: yup.object(),
    date_of_birth: yup.string(),
    address: yup.string(),
    map_location: yup.string(),
    observation: yup.string(),
});

export type { FormValues, ImagePickerResult };
export { initialValues, validationSchema };
