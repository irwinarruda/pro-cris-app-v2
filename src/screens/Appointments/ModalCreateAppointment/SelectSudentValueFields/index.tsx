import React from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import { RHFormSelect } from 'app/components/molecules/RHFormSelect';

import { useStudentStore } from 'app/store/Student/Student.hook';
import { Cost } from 'app/entities/Cost';

type SelectSudentValueFieldsProps = {
    children?: React.ReactNode;
};

const SelectSudentValueFields = ({}: SelectSudentValueFieldsProps) => {
    const { students, listStudentCosts } = useStudentStore('list');

    const id_student = useWatch({ name: 'id_student' });
    const id_cost = useWatch({ name: 'id_cost' });
    const { setValue } = useFormContext();

    const [costs, setCosts] = React.useState<Cost[]>([]);

    const fetchCostData = async (studentId: string) => {
        const studentCosts = await listStudentCosts(studentId);
        setCosts(studentCosts);
    };

    React.useEffect(() => {
        if (id_student) {
            fetchCostData(id_student);
            setValue('id_cost', '');
        }
    }, [id_student]);

    React.useEffect(() => {
        if (id_cost) {
            const selectedCost = costs.find((item) => item.id === id_cost);
            if (selectedCost) {
                setValue('cost.id', id_cost);
                setValue('cost.price', selectedCost.price);
                setValue('cost.time', selectedCost.time);
            }
        }
    }, [id_cost]);

    return (
        <>
            <RHFormSelect
                size="sm"
                label="Escolha um Aluno"
                name="id_student"
                options={students.map((student) => ({
                    label: student.name,
                    value: student.id,
                }))}
            />
            <RHFormSelect
                size="sm"
                label="Escolha uma Valor/Hora"
                name="id_cost"
                options={costs.map((cost: any) => ({
                    label: `Valor: ${cost.price}/Hora: ${cost.time}`,
                    value: cost.id,
                }))}
            />
        </>
    );
};

export type { SelectSudentValueFieldsProps };
export { SelectSudentValueFields };
