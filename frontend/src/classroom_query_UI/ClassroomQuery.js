import React, { useState } from 'react';
import { Box } from '@mui/material';
import ClassroomQueryPaper from './ClassroomQueryPaper';
import ResultList from "./ResultList";

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Box>
            <ClassroomQueryPaper
                floor={floor}
                setFloor={setFloor}
                classroomCode={classroomCode}
                setClassroomCode={setClassroomCode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ResultList
                floor={floor}
                classroomCode={classroomCode}
                searchQuery={searchQuery}
            />
        </Box>
    );
}
