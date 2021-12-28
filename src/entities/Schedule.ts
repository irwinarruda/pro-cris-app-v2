interface Schedule {
    id: string;
    week_day: string;
    day_time: string;
    is_default: boolean;
    is_deleted: boolean;
}

export type { Schedule };
