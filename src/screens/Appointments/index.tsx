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
    const { listStudents, students } = useStudentStore('list');
    const { listAppointments } = useAppointmentStore('all');
    const { onStaggerClose } = useAppointments();

    React.useEffect(() => {
        listStudents();
        listAppointments();
    }, []);

    return (
        <Flex flex="1" bgColor="#ffffff">
            <Flex flex="1" onTouchStart={onStaggerClose}>
                <FilterAppointments />
                {students.length > 0 && <ListAppointments />}
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
