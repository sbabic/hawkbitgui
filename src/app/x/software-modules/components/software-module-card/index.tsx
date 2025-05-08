import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import PlusIcon from '@/app/components/icons/plus-icon';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import SoftwareModuleTableContainer from '../../containers/software-module-table-container';
import SoftwareModuleFormContainer from '../../containers/software-module-form-container';

export default function SoftwareModulesCard() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <Card expanded={true}>
                <div className={styles.cardBody}>
                    <div className={styles.header}>
                        <h2>Software Modules</h2>
                        <div className={styles.headerButtons}>
                            <IconButton width='30px' height='30px'>
                                <SearchIcon />
                            </IconButton>
                            <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={openForm}>
                                Create new module
                            </Button>
                            <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
                                Manage columns
                            </Button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <SoftwareModuleTableContainer />
                    </div>
                </div>
            </Card>
            <Modal isOpen={isFormOpen} onClose={closeForm}>
                <Modal.Header>Create new software module</Modal.Header>
                <Modal.Content>
                    <SoftwareModuleFormContainer onSubmitSuccess={closeForm} onCancel={closeForm} />
                </Modal.Content>
            </Modal>
        </div>
    );
}
