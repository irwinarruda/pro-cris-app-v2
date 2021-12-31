interface Appointment {
    id: string;
    id_student: string;
    cost: {
        id: string;
        time: string;
        price: string;
    };
    date: Date;
    is_extra: boolean;
    is_paid: boolean;
    is_cancelled: boolean;
    observation: string;
}

export type { Appointment };
