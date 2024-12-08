import React, {useState} from 'react';
import {Box} from '@mui/material';
import ClassroomQueryPaper from './ClassroomQueryPaper';
import ResultList from "./ResultList";

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const [reload, setReload] = useState(false);
    const [isBanned, setIsBanned] = useState(null);

    return (
        <Box>
            <ClassroomQueryPaper
                floor={floor}
                setFloor={setFloor}
                classroomCode={classroomCode}
                setClassroomCode={setClassroomCode}
                isBanned={isBanned}
                setIsBanned={setIsBanned}
            />
            <ResultList
                floor={floor}
                classroomCode={classroomCode}
                reload={reload}
                setReload={setReload}
                isBanned={isBanned}
            />
        </Box>
    );
}

