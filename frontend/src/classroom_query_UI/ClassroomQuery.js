import React, {useState} from 'react';
import {Box} from '@mui/material';
import ClassroomQueryPaper from './ClassroomQueryPaper';
import ResultList from "./ResultList";

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');

    return (
        <Box>
            <ClassroomQueryPaper
                floor={floor}
                setFloor={setFloor}
                classroomCode={classroomCode}
                setClassroomCode={setClassroomCode}
            />
            <ResultList floor={floor} classroomCode={classroomCode}/>
        </Box>
    );
}
