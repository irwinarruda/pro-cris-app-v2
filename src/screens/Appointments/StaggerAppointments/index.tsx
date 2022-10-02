import React from 'react';

import {
    ProCrisStagger,
    ProCrisStaggerIcon,
} from 'app/components/molecules/ProCrisStagger';

import { useError } from 'app/hooks/Error';
import { useAppointments } from 'app/hooks/Appointments';
import { useAlert } from 'app/store/Alert/Alert.hook';
import { useLoadingStore } from 'app/store/Loading/Loading.hook';
import { useAppointmentStore } from 'app/store/Appointment/Appointment.hook';

type StaggerAppointmentsProps = {
    children?: React.ReactNode;
};

const StaggerAppointments = ({}: StaggerAppointmentsProps) => {
    const { showError } = useError();
    const { showAlertAsync } = useAlert();
    const { setLoading } = useLoadingStore();
    const { selectedDate, createTodaysRoutineAppointments } =
        useAppointmentStore('date');
    const {
        isStaggerOpen,
        onModalAppointmentOpen,
        onStaggerClose,
        onStaggerOpen,
    } = useAppointments('stagger');

    const handleToggleStagger = () => {
        if (isStaggerOpen) {
            onStaggerClose();
            return;
        }
        onStaggerOpen();
    };

    const handleCreateRoutine = async () => {
        try {
            setLoading(true);
            const { isConfirmed } = await showAlertAsync({
                title: 'Deseja iniciar a rotina?',
                description: `Essa ação iniciará a rotina do dia atual`,
                cancelButtonText: 'Cancelar',
                confirmButtomText: 'Iniciar',
            });
            if (!isConfirmed) {
                return;
            }
            await createTodaysRoutineAppointments(selectedDate);
        } catch (err) {
            showError(err, { title: 'Atenção!', duration: 100000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProCrisStagger isOpen={isStaggerOpen} onToggle={handleToggleStagger}>
            <ProCrisStaggerIcon
                label="Iniciar Rotina"
                bgColor="#60A672"
                borderWidth="1px"
                borderColor="gold.500"
                onPress={handleCreateRoutine}
            />
            <ProCrisStaggerIcon
                label="Criar Aula"
                bgColor="#996074"
                borderWidth="1px"
                borderColor="gold.500"
                toggleOnPressEnd
                onPress={onModalAppointmentOpen}
            />
        </ProCrisStagger>
    );
};

export type { StaggerAppointmentsProps };
export { StaggerAppointments };
