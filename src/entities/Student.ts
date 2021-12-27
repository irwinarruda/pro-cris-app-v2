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
    schedules: {}[];
    costs: {}[];
    appointments: {}[];
}

export type { Student };
