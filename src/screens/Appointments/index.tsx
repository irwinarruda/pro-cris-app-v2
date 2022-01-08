import React from 'react';
import { Flex } from 'native-base';

import { useAppointments, AppointmentsProvider } from 'app/hooks/Appointments';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';
import { useStudentStore } from 'app/store/Student/Student.hook';

import { ModalCreateAppointment } from './ModalCreateAppointment';
import { ListAppointments } from './ListAppointments';
import { FilterAppointments } from './FilterAppointments';
import { StaggerAppointments } from './StaggerAppointments';

type AppointmentsProps = {
    children?: React.ReactNode;
};
const AppointmentsComponents = ({}: AppointmentsProps) => {
    const { listStudents } = useStudentStore('list');
    const { listAppointments } = useAppointmentStore('all');
    const { onStaggerClose } = useAppointments();

    const fetchData = async () => {
        await listStudents();
        await listAppointments();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex flex="1" bgColor="#ffffff">
            <Flex flex="1" onTouchStart={onStaggerClose}>
                <FilterAppointments />
                <ListAppointments />
            </Flex>
            <StaggerAppointments />
            <ModalCreateAppointment />
        </Flex>
    );
};

const Appointments = ({}: AppointmentsProps) => {
    return (
        <AppointmentsProvider>
            <AppointmentsComponents />
        </AppointmentsProvider>
    );
};

export { Appointments };
