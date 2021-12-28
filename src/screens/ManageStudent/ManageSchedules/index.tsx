import React from 'react';
import { Flex } from 'native-base';

import { ProCrisModal } from 'app/components/molecules/ProCrisModal';

type ManageSchedulesProps = {
    isOpen?: boolean;
    setIsOpen?(value: boolean): void;
};

const ManageSchedules = ({ isOpen, setIsOpen }: ManageSchedulesProps) => {
    return (
        <ProCrisModal
            visible={isOpen}
            onRequestClose={() => setIsOpen?.(false)}
            onClose={() => setIsOpen?.(false)}
        >
            <Flex></Flex>
        </ProCrisModal>
    );
};

export type { ManageSchedulesProps };
export { ManageSchedules };
