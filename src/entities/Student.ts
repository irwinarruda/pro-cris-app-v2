import { Cost } from 'app/entities/Cost';
import { Schedule } from 'app/entities/Schedule';
import { Appointment } from 'app/entities/Appointment';
import * as ImagePicker from 'expo-image-picker';

interface Student {
    id: string;
    name: string;
    name_caregiver: string;
    phone: string;
    avatar: string;
    date_of_birth: string;
    address: string;
    map_location: string;
    observation: string;
    color: string;
    schedules: Schedule[];
    costs: Cost[];
    appointments: Appointment[];
}

export type { Student };
